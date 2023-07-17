import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import { BookDto } from '@client/libs/shared/src/lib/types/bookDto';
import React from 'react';
import {
  AiOutlineMinus,
  AiOutlineMinusSquare,
  AiOutlinePlus,
} from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import ImageViewer from './ImageViewer';
import { useAppDispatch } from '@/redux/hook';
import { addToCartAsync } from '@/redux/cartSplice';
import { useNotification } from '@client/libs/shared/src';
import NumberInput from '@/components/NumberInput';
import { useNavigate } from 'react-router-dom';
import { setSearchAttribute } from '@/redux/searchSplice';

interface Props {
  book: BookDto;
}
export default function PreviewSection({ book }: Props) {
  const [amount, setAmount] = React.useState(0);

  const dispatch = useAppDispatch();
  const toast = useNotification();
  const addToCart = () => {
    if (amount <= 0) {
      toast.show({
        type: 'error',
        message: 'Số lượng không hợp lệ',
        duration: 3000,
      });
      return;
    }
    dispatch(
      addToCartAsync({
        book: book,
        quantity: amount,
      })
    );
  };
  const [isShow, setIsShow] = React.useState(false);
  const navigate = useNavigate();
  const onNavigateToAuthor = () => {
    dispatch(
      setSearchAttribute({
        key: 'authorIds',
        value: [book.author!.id],
      })
    );
    navigate('/search');
  };
  const onNavigateToPublisher = () => {
    dispatch(
      setSearchAttribute({
        key: 'publisherIds',
        value: [book.publisher!.id],
      })
    );

    navigate('/search');
  };

  return (
    <section className="flex  gap-x-12 py-4 bg-base-100 p-8 shadow-md">
      <div className="w-4/12 h-[400px] ">
        <img
          src={book?.thumbnailUrl}
          alt={book?.title}
          className="w-full h-auto max-h-full object-contain cursor-pointer"
          onClick={() => setIsShow(true)}
        />
      </div>
      {isShow && (
        <ImageViewer
          listSource={book.bookImages.map((bi) => bi.url)}
          setIsShow={setIsShow}
        />
      )}
      <div className="grow flex items-start py-2 gap-5 flex-col">
        <h1 className="text-3xl font-bold">{book?.title}</h1>
        <div className="flex gap-x-14">
          <div className="text-lg">
            <div>Tác giả:</div>
            <div
              className="text-primary-focus font-bold cursor-pointer"
              onClick={onNavigateToAuthor}
            >
              {book?.author?.name}
            </div>
          </div>
          <div className="text-lg">
            <div>Nhà xuất bản:</div>
            <div
              className="text-primary-focus font-bold cursor-pointer"
              onClick={onNavigateToPublisher}
            >
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
              <NumberInput value={amount} onChange={setAmount} />
            </div>
            <button
              className="btn btn-primary btn-outline  ml-4"
              onClick={addToCart}
            >
              <BsCartPlus className="mr-2" size={20} />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
