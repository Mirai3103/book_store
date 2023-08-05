import { RouteObject } from 'react-router-dom';
import SeriesManagementIndexPage from './Page';
import EditSeriesPage from './EditSeriesPage';

const router: RouteObject[] = [
  {
    path: '/Series',
    element: <SeriesManagementIndexPage />,
  },
  {
    path: '/Series/edit/:id',
    element: <EditSeriesPage />,
  },
];

export default router;
