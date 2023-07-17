import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function UserLayout() {
  const location = useLocation();
  return (
    <div className="mt-10 bg-base-100 shadow-lg  max-w-xs min-h-[80vh]  sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col --xl:flex-row gap-5 mx-auto ">
      <div className="tabs  ">
        {paths.map((path) => (
          <Link
            key={path.path}
            to={path.path}
            className={`tab tab-lifted tab-lg ${
              location.pathname === path.path ? 'tab-active' : ''
            }`}
          >
            {path.display}
          </Link>
        ))}
        <span className="tab tab-lifted tab-lg grow shrink"></span>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

const paths = [
  {
    path: '/user/cart',
    display: 'Giỏ hàng',
  },
  {
    path: '/user/profile',
    display: 'Thông tin cá nhân',
  },
  {
    path: '/user/password',
    display: 'Đổi mật khẩu',
  },
  {
    path: '/user/address',
    display: 'Địa chỉ',
  },
];
