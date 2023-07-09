import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Pages/routes';
// redux provider

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { NotificationProvider } from '@client/libs/shared/src';

import AuthWarp from './wraps/AuthWarp';
import CartWarp from './wraps/CartWarp';
const queryClient = new QueryClient();
export default function App() {
  return (
    <AuthWarp>
      <CartWarp>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
          </QueryClientProvider>
        </NotificationProvider>
      </CartWarp>
    </AuthWarp>
  );
}
