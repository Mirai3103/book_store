import { selectUser } from '@/redux/authSplice';
import { useAppSelector } from '@/redux/hook';
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@shared/Avatar';
export default function Header() {
  const user = useAppSelector(selectUser);
  return (
    <header className="navbar shadow-lg flex justify-between bg-base-100 ">
      <div>
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">
          BookShop
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={'/search'}>Shop</Link>
          </li>
          <li>
            <Link to={'/search'}>Thịnh hành</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Danh mục </summary>
              <ul className="p-2 z-30">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <a>Liên hệ</a>
          </li>
        </ul>
      </div>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Tìm kiếm "
            className="input input-bordered w-96"
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-none flex gap-x-4 items-center">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost avatar items-center justify-center flex"
            >
              <span
                className="text-base  mr-2 font-bold"
                style={{ textTransform: 'none' }}
              >
                {user.displayName}
              </span>

              <Avatar className="w-10" alt={user.displayName} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-lg font-semibold dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
        {!user && (
          <div className="flex gap-x-2">
            <Link to={'/login'} className="btn btn-primary ">
              Đăng nhập
            </Link>
            <Link to={'/register'} className="btn btn-outline ">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
