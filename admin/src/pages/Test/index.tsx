import { RouteObject } from 'react-router-dom';
import TestPage from './TestPage';

const route: RouteObject[] = [
  {
    path: '/test',
    element: <TestPage />,
  },
];
export default route;
