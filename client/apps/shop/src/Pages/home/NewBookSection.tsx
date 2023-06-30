import BookPreviewCard from '@/components/BookPreviewCard';
import bookApiService from '@client/libs/shared/src/lib/Utils/Services/bookApiService';
import { BookPreviewDto } from '@client/libs/shared/src/lib/types/bookPreviewDto';
import { PaginationDto } from '@client/libs/shared/src/lib/types/paginationDto';
import React from 'react';
import { useQuery } from 'react-query';

export default function NewBookSection() {
  const { data, isLoading, isError } = useQuery<
    PaginationDto<BookPreviewDto>,
    Error
  >({
    queryKey: ['newBook'],
    queryFn: () =>
      bookApiService.getAllBooks(
        {
          sortBy: 'createdAt',
          isAsc: false,
        },
        1,
        20
      ),
  });
  return (
    <section className="mx-14 lg:mx-28">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl my-4 font-bold">Sách mới</h1>
      </div>
      <div className="flex flex-wrap gap-0 gap-y-5 justify-evenly">
        {data?.items.map((book) => (
          <BookPreviewCard key={book.id} book={book} className="shadow " />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button className="btn btn-primary">Xem thêm</button>
      </div>
    </section>
  );
}
