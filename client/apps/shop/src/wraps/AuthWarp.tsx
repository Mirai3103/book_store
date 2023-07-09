import { login, logout } from '@/redux/authSplice';
import { useAppDispatch } from '@/redux/hook';
import authApiService from '@client/libs/shared/src/lib/Utils/Services/authApiService';
import React from 'react';

export default function AuthWarp({ children }: { children: React.ReactNode }) {
  const appDispatch = useAppDispatch();

  React.useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      authApiService
        .refreshToken(refreshToken)
        .then((res) => {
          appDispatch(login(res));
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('refreshToken');
        });
      const interval = setInterval(() => {
        authApiService
          .refreshToken(refreshToken)
          .then((res) => {
            appDispatch(login(res));
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem('refreshToken');
            appDispatch(logout());
            clearInterval(interval);
          });
      }, 4 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [appDispatch]);
  return children;
}
