import {
  selectCartTotalItemInBill,
  selectTotalPrice,
} from '@/redux/cartSplice';
import { useAppSelector } from '@/redux/hook';
import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';
import React from 'react';

export default function InvoiceSection() {
  const total = useAppSelector(selectTotalPrice);
  const totalItem = useAppSelector(selectCartTotalItemInBill);
  return (
    <div className=" mb-20 w-full  ">
      <div className="bg-base-100 shadow-lg p-1">
        <h2 className="p-4 border-b">
          <span className="text-2xl font-bold">Thông tin đơn hàng</span>
        </h2>
        <div className="p-4 flex flex-col gap-y-4">
          <div className="flex justify-end gap-x-20">
            <span className="text-2xl font-bold">
              Tạm tính ({totalItem} sản phẩm):
            </span>

            <span className="text-2xl font-bold text-red-600">
              {toCurrencyFormat(total)}
            </span>
          </div>
          <div className="flex justify-end gap-x-20">
            <button className="btn text-white  btn-lg btn-primary min-w-[300px]">
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
