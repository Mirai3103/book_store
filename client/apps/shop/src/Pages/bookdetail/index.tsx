import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import bookApiService from '@client/libs/shared/src/lib/Utils/Services/bookApiService';
import { BookDto } from '@client/libs/shared/src/lib/types/bookDto';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PreviewSection from './PreviewSection';
import DetailSection from './DetailSection';
import RelatedBook from './RelatedBook';
import LoadingScreen from '@/components/LoadingScreen';

export default function BookDetailPage() {
  const slug = useParams<{ slug: string }>().slug;
  const {
    data: book,
    isLoading,
    error,
  } = useQuery<BookDto, Error>({
    queryKey: ['book', slug],
    queryFn: () => bookApiService.getBookDetail(slug),
  });
  if (isLoading || !book) {
    return <LoadingScreen />;
  }
  return (
    <div className="mt-6 max-w-xs  sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl flex flex-col gap-10 mx-auto ">
      <PreviewSection book={book!} />
      <DetailSection book={book!} />
      <RelatedBook book={book!} />
      <div className="h-96"></div>
    </div>
  );
}
