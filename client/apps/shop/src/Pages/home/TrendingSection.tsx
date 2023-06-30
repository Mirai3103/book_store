import { BookPreviewDto } from '@client/libs/shared/src/lib/types/bookPreviewDto';
import { PaginationDto } from '@client/libs/shared/src/lib/types/paginationDto';
import React from 'react';
import { useQuery } from 'react-query';
import bookService from '@client/libs/shared/src/lib/Utils/Services/bookApiService';
import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import BookPreviewCard from '@/components/BookPreviewCard';
import Carousel from '@/components/carousel';
import HeroItem from './HeroItem';

export default function TrendingSection() {
  const { data, isLoading, isError } = useQuery<
    PaginationDto<BookPreviewDto>,
    Error
  >({
    queryKey: 'hero',
    queryFn: () =>
      bookService.getAllBooks(
        {
          sortBy: 'id',
          isAsc: false,
        },
        1,
        10
      ),
  });
  const splicedData = React.useMemo(() => {
    const sizePerChunk = 5;
    if (!data) return undefined;
    const splicedData = [];
    for (let i = 0; i < data.items.length; i += sizePerChunk) {
      splicedData.push(data.items.slice(i, i + sizePerChunk));
    }
    return splicedData;
  }, [data]);

  if (isLoading || !splicedData) return <div>Loading...</div>;
  return (
    <section className="mx-14 lg:mx-28">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl my-4 font-bold">Sách bán chạy</h1>
        <a
          href="/books"
          className="text-primary hover:text-primary-focus text-xl hover:underline underline-offset-2"
        >
          Xem thêm
        </a>
      </div>
      <Carousel withIndicator className=" w-full py-7" itemWidth="">
        {splicedData.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="flex gap-x-1">
              {chunk.map((book) => (
                <BookPreviewCard key={book.id} book={book} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}
