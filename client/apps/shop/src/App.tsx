import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Pages/routes';
// redux provider
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { NotificationProvider } from '@client/libs/shared/src';
import { useAppDispatch } from './redux/hook';
import authApiService from '@client/libs/shared/src/lib/Utils/Services/authApiService';
import { login, logout } from './redux/authSplice';
const queryClient = new QueryClient();
export default function App() {
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
  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </NotificationProvider>
  );
}
