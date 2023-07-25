import { selectUser } from '@/redux/authSplice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@shared/Avatar';
import { setSearchAttribute } from '@/redux/searchSplice';
import CartMenu from './CartMenu';
import { getServerImageURL } from '@client/libs/shared/src/lib/Utils';
export default function Header() {
  const user = useAppSelector(selectUser);
  const keyword = useAppSelector((state) => state.search.filters.keyword);
  const dispatch = useAppDispatch();
  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      dispatch(setSearchAttribute({ key: 'keyword', value }));
    } else {
      dispatch(setSearchAttribute({ key: 'keyword', value: null }));
    }
  };

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
            value={keyword || ''}
            onChange={onKeywordChange}
          />
          <Link to={'/search'} className="btn btn-square">
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
          </Link>
        </div>
      </div>
      <div className="flex-none flex gap-x-4 items-center">
        <CartMenu />
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

              <Avatar
                className="w-10"
                alt={user.displayName}
                src={getServerImageURL(user.avatarUrl)}
              />
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
