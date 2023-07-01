import BookPreviewCard from '@/components/BookPreviewCard';
import Carousel from '@/components/carousel';
import bookApiService from '@client/libs/shared/src/lib/Utils/Services/bookApiService';
import { BookDto } from '@client/libs/shared/src/lib/types/bookDto';
import { BookPreviewDto } from '@client/libs/shared/src/lib/types/bookPreviewDto';
import { PaginationDto } from '@client/libs/shared/src/lib/types/paginationDto';
import React from 'react';
import { useQueries } from 'react-query';

interface Props {
  book: BookDto;
}

enum RelatedBookType {
  Author,
  Category,
  Series,
}

export default function RelatedBook({ book }: Props) {
  const [relatedBookType, setRelatedBookType] = React.useState<RelatedBookType>(
    RelatedBookType.Author
  );
  const [{ data: author }, { data: category }, { data: series }] = useQueries([
    {
      queryKey: ['book', book.authorId],
      queryFn: () =>
        bookApiService.getAllBooks(
          {
            authorId: book.authorId,
          },
          1,
          12
        ),
    },
    {
      queryKey: ['book', book.categoryId],
      queryFn: () =>
        bookApiService.getAllBooks(
          {
            categoryId: book.categoryId,
          },
          1,
          12
        ),
    },
    {
      queryKey: ['book', book.seriesId],
      queryFn: () =>
        book.seriesId
          ? bookApiService.getAllBooks(
              {
                seriesId: book.seriesId,
              },
              1,
              12
            )
          : [],
    },
  ]);
  const handleTabClick = (type: RelatedBookType) => {
    setRelatedBookType(type);
  };
  let data: PaginationDto<BookPreviewDto>;
  switch (relatedBookType) {
    case RelatedBookType.Author:
      data = author;
      break;
    case RelatedBookType.Category:
      data = category;
      break;
    case RelatedBookType.Series:
      data = series;
      break;
    default:
      data = author;
      break;
  }
  return (
    <section className="bg-base-100 p-8 shadow-md">
      <h2 className="text-2xl mb-6 font-bold">Sách liên quan</h2>
      <div className="tabs .tab-bordered mb-5 ml-4">
        <span
          className={`tab-lg tab tab-bordered
        ${relatedBookType === RelatedBookType.Author ? 'tab-active' : ''}`}
          onClick={() => handleTabClick(RelatedBookType.Author)}
        >
          Cùng tác giả
        </span>
        <span
          className={`tab-lg tab tab-bordered ${
            relatedBookType === RelatedBookType.Category ? 'tab-active' : ''
          }`}
          onClick={() => handleTabClick(RelatedBookType.Category)}
        >
          Cùng thể loại
        </span>
        {book.seriesId && (
          <span
            className={`tab-lg tab tab-bordered ${
              relatedBookType === RelatedBookType.Series ? 'tab-active' : ''
            }`}
            onClick={() => handleTabClick(RelatedBookType.Series)}
          >
            Cùng bộ sách
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-around">
        {data ? (
          data.items.map((book: BookPreviewDto) => (
            <BookPreviewCard key={book.id} book={book} className="shadow" />
          ))
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
      </div>
      <div className="flex justify-center mt-9">
        <button className="btn btn-primary">Xem thêm</button>
      </div>
    </section>
  );
}
