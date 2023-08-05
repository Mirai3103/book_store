import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import AppRoute from '@/pages';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>,
      },
      ...AppRoute,
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;
