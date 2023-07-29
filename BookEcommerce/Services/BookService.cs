namespace BookStore.Services;

using System.Threading.Tasks;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Exceptions;
using BookStore.Extensions;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using BookStore.Utils;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System.Collections.Generic;

public class BookService : IBookService
{
    private readonly BookStoreContext _context;
    private readonly IFileService _fileService;
    private readonly IBookAttributeService _bookAttributeService;


    public BookService(BookStoreContext context, IFileService fileService, IBookAttributeService bookAttributeService)
    {
        _context = context;
        _fileService = fileService;
        _bookAttributeService = bookAttributeService;
    }


    public Task<PaginationDto<BookPreviewDto>> AdvancedSearchAsync(AdvancedSearchDto advancedSearchDto, int page, int limit)
    {

        var bookPreviews = _context.Books
            .Include(b => b.Author)
            .AsNoTracking();
        if (advancedSearchDto.keyword != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Name.ContainIgnoreAll(advancedSearchDto.keyword));
        }
        if (advancedSearchDto.authorIds != null)
        {
            bookPreviews = bookPreviews.Where(b => advancedSearchDto.authorIds.Contains(b.AuthorId));
        }
        if (advancedSearchDto.categoryIds != null)
        {
            bookPreviews = bookPreviews.Where(b => advancedSearchDto.categoryIds.Contains(b.CategoryId));
        }
        if (advancedSearchDto.providerIds != null)
        {
            bookPreviews = bookPreviews.Where(b => advancedSearchDto.providerIds.Contains(b.ProviderId));
        }

        if (advancedSearchDto.publisherIds != null)
        {
            bookPreviews = bookPreviews.Where(b => advancedSearchDto.publisherIds.Contains(b.PublisherId));

        }
        if (advancedSearchDto.minPrice != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Price >= advancedSearchDto.minPrice);
        }
        if (advancedSearchDto.maxPrice != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Price <= advancedSearchDto.maxPrice);
        }
        if (advancedSearchDto.seriesIds != null)
        {
            bookPreviews = bookPreviews.Where(b => b.SeriesId != null && advancedSearchDto.seriesIds.Contains((int)b.SeriesId));
        }
        Console.WriteLine(JsonSerializer.Serialize(advancedSearchDto));
        bookPreviews = bookPreviews.SortBy(advancedSearchDto.sortBy, advancedSearchDto.isAsc);
        var bookPreviewsPagination = bookPreviews.Select(b => b.SelectPreview()).ToPagination<BookPreviewDto>(page, limit);
        return Task.FromResult(bookPreviewsPagination);
    }
    public Task<PaginationDto<BookPreviewDto>> SearchBookAsync(BasicSearchDto basicSearchDto, int page, int limit)
    {

        var bookPreviews = _context.Books
            .Include(b => b.Author)
            .AsNoTracking();
        if (basicSearchDto.keyword != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Name.ContainIgnoreAll(basicSearchDto.keyword));
        }
        if (basicSearchDto.authorId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.AuthorId == basicSearchDto.authorId);
        }
        if (basicSearchDto.categoryId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.CategoryId == basicSearchDto.categoryId);
        }
        if (basicSearchDto.providerId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.ProviderId == basicSearchDto.providerId);
        }
        if (basicSearchDto.publisherId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.PublisherId == basicSearchDto.publisherId);

        }
        if (basicSearchDto.minPrice != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Price >= basicSearchDto.minPrice);
        }
        if (basicSearchDto.maxPrice != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Price <= basicSearchDto.maxPrice);
        }
        if (basicSearchDto.seriesId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.SeriesId == basicSearchDto.seriesId);
        }
        Console.WriteLine(JsonSerializer.Serialize(basicSearchDto));
        bookPreviews = bookPreviews.SortBy(basicSearchDto.sortBy, basicSearchDto.isAsc);
        var bookPreviewsPagination = bookPreviews.Select(b => b.SelectPreview()).ToPagination<BookPreviewDto>(page, limit);
        return Task.FromResult(bookPreviewsPagination);
    }
    public async Task<BookPreviewDto> CreateBookAsync(CreateBookDto createBookDto)
    {
        var thumbnailUrlTask = _fileService.SaveFileAsync(createBookDto.Thumbnail);
        var bookImagesUrlTask = _fileService.SaveFilesAsync(createBookDto.Images);
        var book = new Book()
        {
            AuthorId = createBookDto.AuthorId,
            CategoryId = createBookDto.CategoryId,
            CreatedAt = DateTime.UtcNow,
            DeletedAt = null,
            Description = createBookDto.Description,
            Episode = createBookDto.Episode,
            Language = createBookDto.Language,
            Name = createBookDto.Name,
            Title = createBookDto.Title,
            Slug = createBookDto.Title.GenerateSlug(),
            PublisherId = createBookDto.PublisherId,
            ProviderId = createBookDto.ProviderId,
            PublishDate = createBookDto.PublishDate,
            SeriesId = createBookDto.SeriesId,
            Stock = createBookDto.Stock ?? 0,
            ThumbnailUrl = await thumbnailUrlTask,
            Price = createBookDto.Price,
        };
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
        var bookAttributes = createBookDto.BookAttributes.Select(ba => new BookAttribute()
        {
            BookId = book.Id,
            AttributeName = ba.AttributeName,
            AttributeValue = ba.AttributeValue,
        });
        var addBookAtPromise = _context.BookAttributes.AddRangeAsync(bookAttributes);
        var bookImages = await bookImagesUrlTask;
        var bookImagesList = bookImages.Select(bi => new BookImage()
        {
            BookId = book.Id,
            Url = bi,
        });
        await Task.WhenAll(addBookAtPromise, _context.BookImages.AddRangeAsync(bookImagesList));
        await _context.SaveChangesAsync();
        return book.SelectPreview();
    }

    public async Task<BookDto?> GetBookDetailAsync(string slug)
    {
        int id;

        if (int.TryParse(slug, out id))
        {
            return await _context.Books
            .IncludeDetailQuery()
            .Where(b => b.Id == id)
            .Select(b => b.SelectDetail())
            .FirstOrDefaultAsync();


        }
        var book = await _context.Books

        .IncludeDetailQuery()
        .Where(b => b.Slug == slug)
        .Select(b => b.SelectDetail())
        .FirstOrDefaultAsync();


        return book;
    }

    public Task<PaginationDto<BookPreviewDto>> GetBooksPreviewAsync(int page, int limit)
    {
        var bookPreviews = _context.Books.Include(b => b.Author).SortBy(nameof(Book.CreatedAt), false).Select(b => b.SelectPreview())
        .ToPaginationAsync<BookPreviewDto>(page, limit);
        return bookPreviews;
    }

    public async Task<BookPreviewDto> UpdateBookAsync(int id, UpdateBookDto updateBookDto)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            throw new NotFoundException("Book not found");
        }
        book.AuthorId = updateBookDto.AuthorId;
        book.CategoryId = updateBookDto.CategoryId;
        book.Description = updateBookDto.Description;
        book.CategoryId = updateBookDto.CategoryId;
        book.Episode = updateBookDto.Episode;
        book.Language = updateBookDto.Language;
        book.ProviderId = updateBookDto.ProviderId;
        book.PublisherId = updateBookDto.PublisherId;
        book.PublishDate = updateBookDto.PublishDate;
        book.Stock = updateBookDto.Stock ?? 0;
        book.Name = updateBookDto.Name;
        book.Title = updateBookDto.Title;
        book.Slug = updateBookDto.Title.GenerateSlug();
        book.SeriesId = updateBookDto.SeriesId;
        book.Price = updateBookDto.Price;
        await _context.SaveChangesAsync();
        await _bookAttributeService.DeleteBookAttributesAsync(id, updateBookDto.DeleteBookAttributes);
        await _bookAttributeService.CreateBookAttributesAsync(updateBookDto.BookAttributes.Select(b => new BookAttribute() { BookId = id, AttributeName = b.AttributeName, AttributeValue = b.AttributeValue }).ToList());
        return book.SelectPreview();
    }

    public async Task<string> UpdateBookCoverAsync(int id, IFormFile cover)
    {
        var imageUrl = await _fileService.SaveFileAsync(cover);
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            throw new NotFoundException("Book not found");
        }

        var deleteFilePromise = _fileService.DeleteFileAsync(book.ThumbnailUrl);
        book.ThumbnailUrl = imageUrl;
        await _context.SaveChangesAsync();

        return imageUrl;

    }



    async Task IBookService.DeleteBookAsync(int id)
    {
        _context.Books.Remove(_context.Books.Find(id));
        await _context.SaveChangesAsync();
    }

    public async Task<ICollection<string>> GetAllValidBookSlugsAsync()
    {
        return await _context.Books.Select(b => b.Slug).ToListAsync();
    }
}