import React from 'react';
import { SeriesDto } from '@/types/seriesDto';
import { PaginationDto } from '@/types/paginationDto';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import Pagination from '@/components/Pagination';
import seriesApiService from '@shared/Utils/Services/seriesApiService';
import { useQuery } from 'react-query';
import { useDebounceState, usePagination } from '@shared/hooks';
import { OrderByDto } from '@/types/orderByDto';
import { THeadText } from './Data';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { getDiffTimeStr } from '@client/libs/shared/src/lib/Utils';
import { useNavigate } from 'react-router-dom';
import CreateFormModal from './CreateFormModal';
import { useToggle } from 'usehooks-ts';
export default function SeriesManagementIndexPage() {
  const { currentPage, onChangePage, setTotalPages, totalPages } =
    usePagination();
  const [keyword, setKeyword] = useDebounceState('', 2000);
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<OrderByDto<SeriesDto>>({
    orderBy: 'id',
    isAscending: true,
  });
  const { isLoading, data, refetch } = useQuery<PaginationDto<SeriesDto>>({
    queryKey: [
      'series',
      currentPage,
      keyword,
      order.orderBy,
      order.isAscending,
    ],
    queryFn: () =>
      seriesApiService.getAllSeries(
        currentPage,
        16,
        keyword,
        order.orderBy,
        order.isAscending
      ),
  });

  React.useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data, setTotalPages]);

  const handleEditClick = (data: SeriesDto) => {
    navigate(`/Series/edit/${data.id}`);
  };
  const [isOpenCreateDialog, toggleOpenCreateDialog] = useToggle(false);
  return (
    <div>
      <CreateFormModal
        isOpen={isOpenCreateDialog}
        toggle={toggleOpenCreateDialog}
      />
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Quản lý bộ sách </h1>
        <button
          className="btn btn-primary font-bold text-lg"
          onClick={toggleOpenCreateDialog}
        >
          <AiOutlinePlus className="font-bold text-2xl" /> Thêm bộ sách mới
        </button>
      </div>
      <div className=" h-full shadow-xl mx-1 md:mx-4 rounded-lg">
        <div className="form-control w-full my-8 mx-auto max-w-lg px-8">
          <label className="label">
            <span className="label-text">Tìm kiếm</span>
          </label>
          <div className="flex gap-x-8">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              placeholder="Nhập keyword"
              className="input input-bordered w-full "
            />
            <label tabIndex={0} className=" font-bold btn btn-md">
              <BsThreeDotsVertical />
            </label>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto overflow-y-hidden pb-10">
          <table className="table table-md">
            <thead>
              <tr className="font-medium text-xl">
                {THeadText.map((item) => (
                  <th
                    key={item.key}
                    onClick={() => {
                      item.withOrder &&
                        setOrder({
                          orderBy: item.key,
                          isAscending: !order.isAscending,
                        });
                    }}
                    className={item.withOrder ? 'cursor-pointer' : ''}
                  >
                    {item.label}
                    {order.orderBy === item.key ? (
                      order.isAscending ? (
                        <BiCaretUp className="inline-block ml-2" />
                      ) : (
                        <BiCaretDown className="inline-block ml-2" />
                      )
                    ) : (
                      ''
                    )}
                  </th>
                ))}
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={THeadText.length + 1} className="">
                    <div className="text-center flex justify-center items-center py-6">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.items.map((series) => (
                  <tr className="hover" key={series.id}>
                    <td>{series.id}</td>
                    <td className="font-semibold">{series.name}</td>
                    <td>{series.totalBooks}</td>
                    <td>{series.lastedBook?.name || 'trống'}</td>
                    <td>{getDiffTimeStr(series.updatedAt)}</td>
                    <td>{series.author?.name}</td>
                    <td>{series.publisher?.name}</td>

                    <td>
                      <button
                        className="bg-warning btn btn-sm text-warning-content"
                        onClick={() => handleEditClick(series)}
                      >
                        <AiFillEdit size={'20px'} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={THeadText.length + 1} className="text-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPage={totalPages}
                    onPageChange={onChangePage}
                  />
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
