import React from 'react';
import { AuthorDto } from '@/types/authorDto';
import { PaginationDto } from '@/types/paginationDto';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import Pagination from '@/components/Pagination';
import { useDialog } from '@shared/dialog';
import authorApiService from '@/Utils/Services/authorApiService';
import { useQuery } from 'react-query';
import { useToggle } from 'usehooks-ts';
import CreateFormModal from './CreateFormModal';
import { useNotification } from '@shared/toast';
import EditFormModal from './EditFormModal';
import { useDebounceState, usePagination } from '@shared/hooks';
export default function AuthorManagementIndexPage() {
  const { currentPage, onChangePage, setTotalPages, totalPages } =
    usePagination();
  const [keyword, setKeyword] = useDebounceState('', 2000);
  const { createConfirmDialog } = useDialog();
  const [isOpenCreateDialog, toggleOpenCreateDialog] = useToggle(false);
  const [isOpenEditDialog, toggleOpenEditDialog] = useToggle(false);
  const { isLoading, data, refetch } = useQuery<PaginationDto<AuthorDto>>({
    queryKey: ['author', currentPage, keyword],
    queryFn: () => authorApiService.getAllCategories(currentPage, 16, keyword),
  });
  const { show } = useNotification();
  const [selectedData, setSelectedData] = React.useState<AuthorDto>();

  React.useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data, setTotalPages]);

  const onDelete = (id: string) => {
    createConfirmDialog({
      content: `Bạn có chắc chắn muốn xóa tác giả với id ${id} không?`,
      title: 'Bạn có chắc chắn không?',
      onCancel: () => {
        show({ message: 'Đã huỷ', type: 'info' });
      },
      onConfirm: () => {
        authorApiService.deleteAuthor(Number(id)).then((res) => {
          refetch();
          show({ message: 'Đã xóa', type: 'success' });
        });
      },
      cancelText: 'Hủy',
      confirmText: 'Xác nhận xóa',
    });
  };
  const handleEditClick = (data: AuthorDto) => {
    setSelectedData(data);
    toggleOpenEditDialog();
  };
  return (
    <div>
      <CreateFormModal
        isOpen={isOpenCreateDialog}
        toggle={toggleOpenCreateDialog}
      />
      <EditFormModal
        isOpen={isOpenEditDialog}
        toggle={toggleOpenEditDialog}
        oldData={selectedData}
      />
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Quản lý tác giả </h1>
        <button
          className="btn btn-primary font-bold text-lg"
          onClick={toggleOpenCreateDialog}
        >
          <AiOutlinePlus className="font-bold text-2xl" /> Thêm tác giả mới
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
                <th>Mã tác giả</th>
                <th>Tên tác giả</th>
                <th>Giới thiệu</th>
                <th>Tổng số sách</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="">
                    <div className="text-center flex justify-center items-center py-6">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.items.map((author) => (
                  <tr className="hover" key={author.id}>
                    <td>{author.id}</td>
                    <td className="font-semibold">{author.name}</td>
                    <td className="truncate">{author.description}</td>
                    <td>{author.totalBooks}</td>
                    <td>
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <label
                          tabIndex={0}
                          className="m-1 font-bold btn btn-sm"
                        >
                          <BsThreeDots />
                        </label>
                        <ul
                          tabIndex={0}
                          className="p-2 gap-y-1 shadow z-10 menu menu-md dropdown-content bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <button
                              className="bg-warning text-warning-content"
                              onClick={() => handleEditClick(author)}
                            >
                              <AiFillEdit />
                              Sửa thông tin
                            </button>
                          </li>
                          <li>
                            <button
                              className="bg-error text-error-content"
                              onClick={() => onDelete(author.id + '')}
                            >
                              <AiFillDelete />
                              Xoá tác giả
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5} className="text-center">
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
