import NumberInput from '@/components/NumberInput';
import {
  ICartItem,
  addAllToBill,
  clearBill,
  selectCart,
  toggleItem,
  updateCartItemAsync,
} from '@/redux/cartSplice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import React from 'react';

export default function CartSection() {
  const cartItems = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const isAllChecked = cartItems.every((item) => item.isCheck);
  return (
    <div className="bg-base-100 w-fulls">
      <table className="table ">
        <thead>
          <tr className="text-base">
            <th colSpan={3}>
              <label className="cursor-pointer label justify-start gap-x-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={isAllChecked}
                  onChange={() => {
                    if (!isAllChecked) {
                      dispatch(addAllToBill());
                    } else {
                      dispatch(clearBill());
                    }
                  }}
                />
                <span>Chọn tất cả ({cartItems.length}) sản phẩm</span>
              </label>
            </th>
            <th className="text-center">Số lượng</th>
            <th className="text-center">Thành tiền</th>
          </tr>
        </thead>
        <tbody className="text-base">
          {cartItems.map((item) => (
            <CartItem key={item.book.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
interface ICartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: ICartItemProps) => {
  const dispatch = useAppDispatch();
  const handleChanged = (value: number) => {
    dispatch(updateCartItemAsync({ id: item.book.id, quantity: value }));
  };
  const handleCheckboxChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleItem({ id: item.book.id }));
    },
    [dispatch, item.book.id]
  );

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={item.isCheck || false}
          className="checkbox checkbox-sm"
          onChange={handleCheckboxChanged}
        />
      </td>
      <td>
        <img
          src={item.book.thumbnailUrl}
          alt={item.book.name}
          className="w-32 aspect-[2/3]"
        />
      </td>
      <td className="align-top ">
        <div className="flex flex-col mt-1 lg:mt-4 lg:gap-y-4 h-full justify-start">
          <span className="xl:font-bold font-semibold text-base xl:text-xl">
            {item.book.name}
          </span>
          <span className="text-primary xl:font-bold font-semibold text-sm xl:text-lg">
            {toCurrencyFormat(item.book.price)}
          </span>
        </div>
      </td>
      <td>
        <NumberInput value={item.quantity} onChange={handleChanged} size="sm" />
      </td>
      <td className="font-bold lg:text-lg text-red-500 ">
        {toCurrencyFormat(item.book.price * item.quantity)}
      </td>
      <td>
        <button className="btn btn-sm btn-error">Xóa</button>
      </td>
    </tr>
  );
};
