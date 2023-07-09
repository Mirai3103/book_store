import { clearBill } from '@/redux/cartSplice';
import { useAppDispatch } from '@/redux/hook';
import React from 'react';
import CartSection from './CartSection';
import InvoiceSection from './InvoiceSection';

export default function CartPage() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(clearBill());
    };
  }, []);
  return (
    <div className="mt-6 max-w-xs min-h-screen  sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col --xl:flex-row gap-5 mx-auto ">
      <CartSection />
      <InvoiceSection />
    </div>
  );
}
