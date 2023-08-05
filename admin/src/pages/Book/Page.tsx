import React from 'react';
import { Switch } from '@headlessui/react';
import { useQuery } from 'react-query';
import { usePagination } from '@shared/hooks';
import bookApiService from '@shared/Utils/Services/bookApiService';
import { useForm } from 'react-hook-form';
import { AdvancedSearchDto } from '@/types/advancedSearchDto';
import { PaginationDto } from '@/types/paginationDto';
import { BookPreviewDto } from '@/types/bookPreviewDto';
import Pagination from '@/components/Pagination';
import { THeadText } from './Data';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import {
  AiFillEdit,
  AiOutlineClear,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai';
import { toCurrencyFormat, toFullTimeFormat } from '@shared/Utils';
import TextInputWithRef from '@/components/TextInput';
import AuthorComboBox from '@shared/AuthorComboBox';
import PublisherCombobox from '@shared/PublisherCombobox';
import CategoryComboBox from '@shared/CategoryComboBox';
import SeriesComboBox from '@shared/CategoryComboBox';
import { useNavigate } from 'react-router-dom';

export default function BookManagementIndexPage() {
  const { currentPage, onChangePage, totalPages, setTotalPages } =
    usePagination();
  const [applyFilter, setApplyFilter] = React.useState<AdvancedSearchDto>({});
  const { getValues, setValue, handleSubmit, register, reset } =
    useForm<AdvancedSearchDto>({});
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<
    AdvancedSearchDto,
    any,
    PaginationDto<BookPreviewDto>
  >({
    queryKey: ['book', currentPage, applyFilter],
    queryFn: () => bookApiService.getAllBooks(applyFilter, currentPage, 20),
    onSuccess: (data) => {
      setTotalPages(data.totalPages);
      onChangePage(data.currentPage);
    },
  });
  const onApplyFilter = (data: AdvancedSearchDto) => {
    setApplyFilter({ ...data });
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Quản lý sách</h1>
        <button
          className="btn btn-success items-center"
          onClick={() => navigate('/book/create')}
        >
          <AiOutlinePlus size={24} className="inline-block mr-2" />
          Thêm sách
        </button>
      </div>

      <fieldset className="border my-6 border-gray-300 p-4 pt-2 rounded-md">
        <legend className="text-lg font-semibold">Tìm kiếm nâng cao</legend>
        <form onSubmit={handleSubmit(onApplyFilter)}>
          <div className="grid grid-cols-2  gap-x-4 gap-y-1">
            <TextInputWithRef
              label="Keyword"
              {...register('keyword')}
              placeholder="keyword"
            />
            <AuthorComboBox
              onChange={(authorId) =>
                setValue('authorId', authorId as number, {
                  shouldValidate: true,
                })
              }
              value={getValues('authorId')}
            />
            <PublisherCombobox
              onChange={(publisherId) =>
                setValue('publisherId', publisherId as number, {
                  shouldValidate: true,
                })
              }
              value={getValues('publisherId')}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <TextInputWithRef
                label="Khoảng giá từ"
                {...register('minPrice')}
                placeholder="giá từ"
              />
              <TextInputWithRef
                label="Khoảng giá đến"
                {...register('maxPrice')}
                placeholder="giá đến"
              />
            </div>
            <CategoryComboBox
              onChange={(categoryId) =>
                setValue('categoryId', categoryId as number, {
                  shouldValidate: true,
                })
              }
              value={getValues('categoryId')}
            />
            <SeriesComboBox
              onChange={(seriesId) =>
                setValue('seriesId', seriesId as number, {
                  shouldValidate: true,
                })
              }
              value={getValues('seriesId')}
            />
            <div className="col-span-2 flex justify-end mt-4">
              <div className="btn-group">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onApplyFilter)}
                >
                  <AiOutlineSearch size={24} className="inline-block mr-2" />
                  Tìm kiếm
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    reset();
                  }}
                >
                  <AiOutlineClear size={24} className="inline-block mr-2" />
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </div>
        </form>
      </fieldset>

      <div className="max-w-full overflow-x-auto overflow-y-hidden pb-10">
        <table className="table table-md">
          <thead>
            <tr className="font-medium text-xl">
              {THeadText.map((item) => (
                <th
                  key={item.key}
                  onClick={() => {
                    if (item.withOrder) {
                      setValue('isAsc', !getValues('isAsc'), {
                        shouldValidate: true,
                      });
                      setValue('sortBy', item.key, {
                        shouldValidate: true,
                      });
                      handleSubmit(onApplyFilter)();
                    }
                  }}
                  className={item.withOrder ? 'cursor-pointer' : ''}
                >
                  {item.label}
                  {getValues('sortBy') === item.key ? (
                    getValues('isAsc') ? (
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
              data?.items.map((book) => (
                <tr className="hover" key={book.id}>
                  <td>{book.id}</td>
                  <td className="font-semibold">{book.title}</td>
                  <td>{book.author?.name || ''}</td>
                  <td>{toCurrencyFormat(book.price)}</td>
                  <td>{toFullTimeFormat(book.createdAt)}</td>

                  <td>
                    <button
                      className="bg-warning btn btn-sm text-warning-content"
                      onClick={() => navigate(`/book/edit/${book.id}`)}
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
  );
}
