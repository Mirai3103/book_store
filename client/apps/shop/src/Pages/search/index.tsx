import React from 'react';
import FilterSection from './FilterSection';
import { resetSearch, selectFilters } from '@/redux/searchSplice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useMutation, useQuery } from 'react-query';
import { AdvancedSearchDto } from '@client/libs/shared/src/lib/types/advancedSearchDto';
import { PaginationDto } from '@client/libs/shared/src/lib/types/paginationDto';
import BookPreviewCard from '@/components/BookPreviewCard';
import { BookPreviewDto } from '@client/libs/shared/src/lib/types/bookPreviewDto';
import bookApiService from '@client/libs/shared/src/lib/Utils/Services/bookApiService';
import { usePagination } from '@client/libs/shared/src/lib/hooks';
import Pagination from '@shared/Pagination';
import { useIsMounted } from 'usehooks-ts';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    console.log('first render search');
    return () => {
      console.log('reset search');
      dispatch(resetSearch());
    };
  }, [dispatch]);
  const filters = useAppSelector(selectFilters);
  const { currentPage, onChangePage, setTotalPages, totalPages } =
    usePagination();
  const { data, mutate, isLoading } = useMutation<
    PaginationDto<BookPreviewDto>,
    Error,
    AdvancedSearchDto
  >({
    mutationFn: (data) => bookApiService.advancedSearch(data, currentPage, 24),
    mutationKey: ['search', currentPage],
    onSuccess: (data) => {
      setTotalPages(data.totalPages);
    },
  });
  const onApplyFilter = () => {
    mutate(filters);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    mutate(filters);
  }, [mutate, currentPage]);

  return (
    <div className="min-h-screen">
      <div className="mt-10 max-w-xs  sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl flex gap-10 mx-auto">
        <FilterSection onApplyFilter={onApplyFilter} />
        <div className="grow bg-base-100 p-4">
          <div className="flex justify-between ">
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
          {isLoading && (
            <div className="flex justify-center mt-5">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          <div className="flex flex-wrap justify-evenly gap-y-4">
            {data?.items.map((book) => (
              <BookPreviewCard key={book.id} book={book} className="shadow" />
            ))}
          </div>
          {data?.items.length === 0 ? (
            <div className="flex justify-center mt-5">
              <span className="text-xl">Không có kết quả nào</span>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <Pagination
                currentPage={currentPage}
                onPageChange={onChangePage}
                totalPage={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
