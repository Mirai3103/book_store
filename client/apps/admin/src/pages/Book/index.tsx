import { RouteObject } from 'react-router-dom';
import BookManagementIndexPage from './Page';
import CreateNewBookPage from './CreateNewBook';
import EditBookPage from './EditBook';
import EditBookImage from './EditBookImage';

const routes: RouteObject[] = [
  {
    path: 'book',
    element: <BookManagementIndexPage />,
  },
  {
    path: 'book/create',
    element: <CreateNewBookPage />,
  },
  {
    path: 'book/edit/:id',
    element: <EditBookPage />,
  },
  {
    path: 'book/edit/:id/image',
    element: <EditBookImage />,
  },
];

export default routes;
