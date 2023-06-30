import Carousel from '@/components/carousel';
import React from 'react';
import HeroItem from './HeroItem';
import bookService from '@shared/Utils/Services/bookApiService';
import { useQuery } from 'react-query';
import { PaginationDto } from '@shared/types/paginationDto';
import { BookPreviewDto } from '@shared/types/bookPreviewDto';

export default function HeroSection() {
  const { data, isLoading, isError } = useQuery<
    PaginationDto<BookPreviewDto>,
    Error
  >({
    queryKey: 'hero',
    queryFn: () =>
      bookService.getAllBooks(
        {
          sortBy: 'createdAt',
          isAsc: false,
        },
        1,
        10
      ),
  });
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <section className="mx-14 lg:mx-28">
      <Carousel withIndicator className=" w-full">
        {data.items.map((book) => (
          <Carousel.Item key={book.id}>
            <HeroItem book={book} />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}
