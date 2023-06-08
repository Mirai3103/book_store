import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import BookManagementIndexPage from '../pages/Book';
import CategoryRoute from '@/pages/Category';
import AuthorRoute from '@/pages/Author';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>,
      },
      {
        path: '/book',
        element: <BookManagementIndexPage />,
      },
      ...CategoryRoute,
      ...AuthorRoute,
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;
