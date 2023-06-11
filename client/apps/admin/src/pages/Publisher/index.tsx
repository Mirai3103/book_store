import { RouteObject } from 'react-router-dom';
import PublisherManagementIndexPage from './Page';

const router: RouteObject[] = [
  {
    path: '/publisher',
    element: <PublisherManagementIndexPage />,
  },
];

export default router;
