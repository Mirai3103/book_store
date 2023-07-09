import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from './home';
import LoginPage from './login';
import RegisterPage from './register';
import BookDetailPage from './bookdetail';
import SearchPage from './search';
import CartPage from './user/cart';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'book/detail/:slug',
        element: <BookDetailPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'user/cart',
        element: <CartPage />,
      },
    ],
  },
];

const appRoutes = createBrowserRouter(routes);
export default appRoutes;
