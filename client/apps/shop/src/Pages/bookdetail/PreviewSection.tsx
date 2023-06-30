import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import { BookDto } from '@client/libs/shared/src/lib/types/bookDto';
import React from 'react';
import {
  AiOutlineMinus,
  AiOutlineMinusSquare,
  AiOutlinePlus,
} from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';

interface Props {
  book: BookDto;
}
export default function PreviewSection({ book }: Props) {
  const [amount, setAmount] = React.useState(0);
  const minus = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  const plus = () => {
    setAmount(amount + 1);
  };

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setAmount(value);
    }
  };

  return (
    <section className="flex  gap-x-12 py-4 bg-base-100 p-8 shadow-md">
      <div className="w-4/12 ">
        <img
          src={book?.thumbnailUrl}
          alt={book?.title}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="grow flex items-start py-2 gap-5 flex-col">
        <h1 className="text-3xl font-bold">{book?.title}</h1>
        <div className="flex gap-x-14">
          <div className="text-lg">
            <div>Tác giả:</div>
            <div className="text-primary-focus font-bold cursor-pointer">
              {book?.author?.name}
            </div>
          </div>
          <div className="text-lg">
            <div>Nhà xuất bản:</div>
            <div className="text-primary-focus font-bold cursor-pointer">
              {book?.publisher?.name}
            </div>
          </div>
          <div className="text-lg">
            <div>Ngày xuất bản:</div>
            <div className=" font-bold cursor-pointer">{book?.publishDate}</div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full flex-wrap">
          <div className="flex flex-col gap-2">
            <div className="text-lg">Giá bán</div>
            <span className="text-error text-4xl font-bold ">
              {toCurrencyFormat(book?.price || 0)}
            </span>
          </div>
          <div className="flex items-end gap-x-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Số lượng</span>
              </label>
              <label className="input-group">
                <span onClick={minus}>
                  <AiOutlineMinus size={20} />
                </span>
                <input
                  placeholder="10"
                  className="input w-24  input-bordered"
                  value={amount}
                  onChange={handleChanged}
                />
                <span onClick={plus}>
                  <AiOutlinePlus size={20} />
                </span>
              </label>
            </div>
            <button className="btn btn-primary btn-outline  ml-4">
              <BsCartPlus className="mr-2" size={20} />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
