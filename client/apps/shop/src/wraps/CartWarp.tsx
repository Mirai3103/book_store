import { selectIsAuthenticated } from '@/redux/authSplice';
import { fetchCartAsync } from '@/redux/cartSplice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React from 'react';

export default function CartWarp({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchCartAsync());
    }
  }, [isAuth, dispatch]);
  return children;
}
