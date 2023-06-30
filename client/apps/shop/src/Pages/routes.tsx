import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from './home';
import LoginPage from './login';
import RegisterPage from './register';
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
    ],
  },
];

const appRoutes = createBrowserRouter(routes);
export default appRoutes;
