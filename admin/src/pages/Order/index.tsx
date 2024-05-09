import React from 'react';
import { RouteObject } from 'react-router-dom';

export function OrderManagement() {
  return <div>OrderManagement</div>;
}
const router: RouteObject[] = [
  {
    path: '/order',
    element: <OrderManagement />,
  },
];
export default router;
