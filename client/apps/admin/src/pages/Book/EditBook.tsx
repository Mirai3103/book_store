import bookApiService from '@/Utils/Services/bookApiService';
import AuthorComboBox from '@/components/AuthorComboBox';
import CategoryComboBox from '@/components/CategoryComboBox';
import LoadingScreen from '@/components/LoadingScreen';
import ProviderComboBox from '@/components/ProviderComboBox';
import PublisherCombobox from '@/components/PublisherCombobox';
import SeriesComboBox from '@/components/SeriesComboBox';
import TextAreaWithRef from '@/components/TextArea';
import TextInputWithRef from '@/components/TextInput';
import { BookDto } from '@/types/bookDto';
import { CreateBookDto } from '@/types/createBookDto';
import { UpdateBookDto } from '@/types/updateBookDto';
import { useNotification } from '@client/libs/shared/src/lib/toast';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  AiOutlineClear,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineFileImage,
  AiOutlineSave,
} from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import { Link, Navigate, useParams } from 'react-router-dom';

type CreateBookDTOFormFields = CreateBookDto & {
  attributeName: string;
  attributeValue: string;
};

export default function EditBookPage() {
  const id = useParams().id;
  const toast = useNotification();
  const {
    register,
    getValues,
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { touchedFields },
  } = useForm<
    UpdateBookDto & {
      attributeName: string;
      attributeValue: string;
    },
    any,
    UpdateBookDto
  >({
    defaultValues: {
      bookAttributes: [],
      deleteBookAttributes: [],
    },
  });
  const {
    fields: bookAttributes,
    append: appendBookAttribute,
    remove: removeBookAttribute,
    insert: insertBookAttribute,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'bookAttributes', // unique name for your Field Array
  });
  const {
    fields: deletedBookAttributes,
    append: appendDeletedBookAttributes,
    remove: removeDeletedBookAttributes,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'deleteBookAttributes' as any, // unique name for your Field Array
  });
  const {
    data: book,
    isLoading: isLoadingBookDetail,
    refetch,
    isFetched,
  } = useQuery<undefined, any, BookDto>({
    queryKey: ['book', id],
    queryFn: () => bookApiService.getBookDetail(id),
  });
  React.useEffect(() => {
    if (isFetched && book) {
      reset({
        authorId: book.author?.id,
        categoryId: book.category?.id,
        deleteBookAttributes: [],
        providerId: book.provider?.id,
        publisherId: book.publisher?.id,
        seriesId: book.series?.id,
        bookAttributes: [...book.bookAttributes],
        attributeName: '',
        attributeValue: '',
        description: book.description,
        episode: book.episode,
        language: book.language,
        name: book.name,
        price: book.price,
        publishDate: book.publishDate,
        stock: book.stock,
        title: book.title,
      });
    }
  }, [book, isFetched, reset]);

  if (!id) {
    toast.show({
      message: 'Không tìm thấy sách',
      type: 'error',
      duration: 3000,
    });
    return <Navigate to="/admin/book" />;
  }
  const handleUpdateBook = async (data: UpdateBookDto) => {
    await bookApiService.updateBook(id, data);
    toast.show({
      message: 'Cập nhật sách thành công',
      type: 'success',
      duration: 3000,
    });
    refetch();
  };
  if (isLoadingBookDetail) {
    return <LoadingScreen />;
  }
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">
          Sửa sách
          <span className="font-bold ml-2 italic">
            {book?.title} #{id}
          </span>
        </h1>
        <Link to={'image'} className="btn btn-warning">
          <AiOutlineFileImage size={24} className="mr-2" />
          Sửa đổi hình ảnh
        </Link>
      </div>

      <form
        className="flex flex-col gap-y-6"
        onSubmit={handleSubmit(handleUpdateBook)}
      >
        <fieldset className="border p-4 m-4 flex flex-col gap-y-4 rounded-lg">
          <legend className="text-base font-semibold">Thông tin chính</legend>
          <TextInputWithRef
            label="Tên sách"
            required
            {...register('name', {
              required: true,
              minLength: 5,
              maxLength: 255,
            })}
          />
          <TextInputWithRef
            label="Tiêu đề"
            required
            {...register('title', {
              required: true,
              minLength: 5,
              maxLength: 255,
            })}
          />
          <TextInputWithRef
            label="Giá bán"
            type="number"
            required
            {...register('price', { required: true, min: 1000 })}
          />

          <TextInputWithRef label="Tập" type="text" {...register('episode')} />
        </fieldset>
        <fieldset className="border p-4 m-4 flex flex-col gap-y-4 rounded-lg">
          <legend className="text-base font-semibold">
            Thông tin chi tiết
          </legend>

          <TextInputWithRef
            label="Tồn kho"
            type="number"
            {...register('stock')}
          />
          <AuthorComboBox
            label="Tác giả"
            onChange={(value) => {
              setValue('authorId', value as number, { shouldValidate: true });
            }}
            value={getValues('authorId')}
            placeholder="=== Chọn tác giả ==="
            required
            defaultSearchValue={book?.author?.name}
          />
          <PublisherCombobox
            label="Nhà xuất bản"
            onChange={(value) => {
              setValue('publisherId', value as number, {
                shouldValidate: true,
              });
            }}
            value={getValues('publisherId')}
            placeholder="=== Chọn nhà xuất bản ==="
            required
            defaultSearchValue={book?.publisher?.name}
          />
          <CategoryComboBox
            label="Danh mục"
            onChange={(value) => {
              setValue('categoryId', value as number, { shouldValidate: true });
            }}
            value={getValues('categoryId')}
            required
            placeholder="=== Chọn danh mục ==="
            defaultSearchValue={book?.category?.name}
          />
          <ProviderComboBox
            label="Nhà cung cấp"
            onChange={(value) => {
              setValue('providerId', value as number, { shouldValidate: true });
            }}
            value={getValues('providerId')}
            required
            placeholder="=== Chọn nhà cung cấp ==="
            defaultSearchValue={book?.provider?.name}
          />
          <SeriesComboBox
            label="Bộ sách"
            onChange={(value) => {
              setValue('seriesId', value as number, { shouldValidate: true });
            }}
            value={getValues('seriesId')}
            placeholder="=== Chọn bộ sách ==="
            defaultSearchValue={book?.series?.name}
          />
        </fieldset>
        <fieldset className="border p-4 m-4 flex flex-col gap-y-4 rounded-lg">
          <legend className="text-base font-semibold">Thông tin khác</legend>
          <TextAreaWithRef
            label="Mô tả sách"
            required
            placeholder="Mô tả sách..."
            {...register('description', { required: true })}
          />
          <TextInputWithRef
            label="Ngôn ngữ"
            type="text"
            required
            {...register('language', { required: true })}
          />
          <TextInputWithRef
            label="Năm xuất bản"
            type="text"
            required
            {...register('publishDate', { required: true })}
          />
          <h2 className="text-lg font-semibold">Thuộc tính khác</h2>
          <div className="flex gap-x-6 items-end">
            <TextInputWithRef
              label="Tên thuộc tính"
              type="text"
              {...register('attributeName')}
            />
            <TextInputWithRef
              label="Giá trị"
              type="text"
              {...register('attributeValue')}
            />
            <button
              type="button"
              className="btn btn-accent"
              onClick={(e) => {
                if (!getValues('attributeName') || !getValues('attributeValue'))
                  return toast.show({
                    message: 'Tên thuộc tính và giá trị không được để trống',
                    type: 'error',
                    duration: 3000,
                  });

                appendBookAttribute({
                  attributeName: getValues('attributeName'),
                  attributeValue: getValues('attributeValue'),
                });
                setValue('attributeName', '', { shouldValidate: true });
                setValue('attributeValue', '', { shouldValidate: true });
              }}
            >
              Thêm thuộc tính
            </button>
          </div>
          <table className="table w-full  table-md">
            <thead>
              <tr className="font-bold text-lg">
                <th>Tên thuộc tính</th>
                <th>Giá trị</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getValues('bookAttributes').map((attr, index) => (
                <tr className="hover text-lg" key={index}>
                  <td className="text-lg"> {attr.attributeName}</td>
                  <td className="text-lg"> {attr.attributeValue}</td>

                  <td className="w-1">
                    <button
                      type="button"
                      className="btn btn-error btn-sm btn-outline"
                      onClick={() => {
                        removeBookAttribute(index);
                        appendDeletedBookAttributes(attr.attributeName);
                      }}
                    >
                      <AiOutlineClose size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            className="btn btn-outline mr-2"
            onClick={() => refetch()}
          >
            <AiOutlineClear size={24} className="mr-2" />
            Reset
          </button>
          <button type="submit" className="btn btn-primary items-center">
            <AiOutlineSave size={24} className="mr-2" />
            {'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
