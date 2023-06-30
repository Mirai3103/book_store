import React from 'react';
import { BookPreviewDto } from '@shared/types/bookPreviewDto';
import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import { BsCartPlus } from 'react-icons/bs';
interface IBookPreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  book: BookPreviewDto;
}

export default function BookPreviewCard({
  book,
  className,
  ...props
}: IBookPreviewCardProps) {
  return (
    <div
      className={
        'card rounded-none card-compact w-56 mx-1 bg-base-100 hover:shadow-xl ' +
          className || ''
      }
      {...props}
    >
      <figure className="px-8 py-2">
        <img
          src={book.thumbnailUrl}
          alt="Shoes"
          className="aspect-[3/4] object-cover"
        />
      </figure>
      <div className="card-body gap-0">
        <h2
          className="card-title
        min-h-[50px]
        hover:cursor-pointer hover:text-primary-focus line-clamp-2 text-base"
        >
          {book.title}
        </h2>
        <span className="font-semibold text-red-700 text-lg">
          {toCurrencyFormat(book.price)}
        </span>
        <div className="card-actions justify-center mt-3">
          <button className="btn-sm btn-outline btn btn-primary">
            <BsCartPlus className="mr-2" size={20} />
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
