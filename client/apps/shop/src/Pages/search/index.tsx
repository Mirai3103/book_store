import React from 'react';
import FilterSection from './FilterSection';
import { resetSearch } from '@/redux/searchSplice';
import { useAppDispatch } from '@/redux/hook';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    console.log('first render search');
    return () => {
      console.log('reset search');
      dispatch(resetSearch());
    };
  }, [dispatch]);
  return (
    <div className="min-h-screen">
      <div className="mt-10 max-w-xs  sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl flex gap-10 mx-auto">
        <FilterSection />
        <div className="grow bg-base-100 shadow-md p-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Kết quả tìm kiếm </h2>
            <div className="flex gap-x-2 items-center">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn m-1"
                  style={{
                    textTransform: 'none',
                  }}
                >
                  Sắp xếp theo : Tên
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Tăng dần</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </label>
              </div>
            </div>
          </div>
          F
        </div>
      </div>
    </div>
  );
}
