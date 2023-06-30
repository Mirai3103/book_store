import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import bookApiService from '@client/libs/shared/src/lib/Utils/Services/bookApiService';
import { BookDto } from '@client/libs/shared/src/lib/types/bookDto';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PreviewSection from './PreviewSection';

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
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-6 max-w-xs xl:max-w-6xl flex flex-col gap-10 mx-auto ">
      <PreviewSection book={book!} />
      <section className="bg-base-100 p-8 shadow-md">
        <h2 className="text-2xl mb-6 font-bold">Chi tiết sách</h2>
        <table className="table text-base border">
          <tbody>
            <tr>
              <td className="font-bold">Mã sách</td>
              <td>{book?.id}</td>
            </tr>
            <tr>
              <td className="font-bold">Tên sách</td>
              <td>{book?.name}</td>
            </tr>
            <tr>
              <td className="font-bold">Tác giả</td>
              <td>{book?.author?.name}</td>
            </tr>
            <tr>
              <td className="font-bold">Nhà xuất bản</td>
              <td>{book?.publisher?.name}</td>
            </tr>
            <tr>
              <td className="font-bold">Nhà cung cấp</td>
              <td>{book?.publisher?.name}</td>
            </tr>
            <tr>
              <td className="font-bold">Ngày xuất bản</td>
              <td>{book?.publishDate}</td>
            </tr>
            <tr>
              <td className="font-bold">Thể loại</td>
              <td>{book?.category?.name}</td>
            </tr>
            {book?.bookAttributes.map((attr, index) => (
              <tr key={index}>
                <td className="font-bold">{attr.attributeName}</td>
                <td>{attr.attributeValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="prose w-full max-w-none">
          <h2 className="mt-4">Mô tả</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: book?.description?.split('\n').join('<br />') || '',
            }}
            className="w-full px-8 "
          >
            {}
          </p>
        </div>
      </section>
      <section className="bg-base-100 p-8 shadow-md">
        <h2 className="text-2xl mb-6 font-bold">Sách cùng tác giả</h2>
      </section>
      <div className="h-96"></div>
    </div>
  );
}
