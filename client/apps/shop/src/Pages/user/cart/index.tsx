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
    <>
      <CartSection />
      <InvoiceSection />
    </>
  );
}
