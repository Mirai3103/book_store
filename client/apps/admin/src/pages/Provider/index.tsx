import { RouteObject } from 'react-router-dom';
import ProviderManagementIndexPage from './Page';

const router: RouteObject[] = [
  {
    path: '/provider',
    element: <ProviderManagementIndexPage />,
  },
];

export default router;
