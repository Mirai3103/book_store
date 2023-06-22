import bookApiService from '@/Utils/Services/bookApiService';
import AuthorComboBox from '@/components/AuthorComboBox';
import CategoryComboBox from '@/components/CategoryComboBox';
import ProviderComboBox from '@/components/ProviderComboBox';
import PublisherCombobox from '@/components/PublisherCombobox';
import SeriesComboBox from '@/components/SeriesComboBox';
import TextAreaWithRef from '@/components/TextArea';
import TextInputWithRef from '@/components/TextInput';
import { CreateBookDto } from '@/types/createBookDto';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClear, AiOutlineClose, AiOutlineSave } from 'react-icons/ai';
import { useMutation } from 'react-query';

type CreateBookDTOFormFields = CreateBookDto & {
  attributeName: string;
  attributeValue: string;
};

export default function CreateNewBookPage() {
  const {
    register,
    getValues,
    setValue,
    formState: { dirtyFields, touchedFields, errors },
    handleSubmit,
  } = useForm<CreateBookDTOFormFields, any, CreateBookDto>({
    defaultValues: {
      bookAttributes: [],
    },
  });
  const { mutate, data, isLoading, error } = useMutation({
    mutationFn: (formData: FormData) => bookApiService.createBook(formData),
  });
  const onSubmit = (data: CreateBookDto) => {
    //multipart form data
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('thumbnail', data.thumbnail[0]);
    formData.append('episode', data.episode || '');
    formData.append('stock', data.stock?.toString() || '0');
    formData.append('authorId', data.authorId.toString());
    formData.append('publisherId', data.publisherId.toString());
    formData.append('categoryId', data.categoryId.toString());
    formData.append('providerId', data.providerId.toString());
    formData.append('seriesId', data.seriesId?.toString() || '');
    formData.append('description', data.description || '');
    formData.append('bookAttributes', JSON.stringify(data.bookAttributes));
    formData.append('publishDate', data.publishDate || '');
    formData.append('language', data.language || '');

    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }
    mutate(formData);
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl">Tạo sách mới</h1>
      <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="border p-4 m-4 flex flex-col gap-y-4 rounded-lg">
          <legend className="text-base font-semibold">Thông tin chính</legend>
          <TextInputWithRef
            label="Tên sách"
            error={errors.name?.message}
            {...register('name', {
              required: true,
              minLength: 5,
              maxLength: 244,
            })}
          />
          <TextInputWithRef
            label="Tiêu đề"
            required
            error={errors.title?.message}
            {...register('title', {
              required: true,
              minLength: 5,
              maxLength: 244,
            })}
          />
          <TextInputWithRef
            label="Giá bán"
            type="number"
            required
            error={errors.price?.message}
            {...register('price', { required: true, min: 1000 })}
          />

          <TextInputWithRef
            label="Ảnh"
            type="file"
            className="file-input file-input-bordered w-full"
            required
            error={errors.thumbnail?.message}
            {...register('thumbnail', { required: true })}
            accept="image/*"
            multiple={false}
          />

          <TextInputWithRef
            label="Tập"
            type="text"
            error={errors.episode?.message}
            {...register('episode', { required: false })}
          />
        </fieldset>
        <fieldset className="border p-4 m-4 flex flex-col gap-y-4 rounded-lg">
          <legend className="text-base font-semibold">
            Thông tin chi tiết
          </legend>

          <TextInputWithRef
            label="Tồn kho"
            type="number"
            {...register('stock', { required: true, min: 0 })}
          />
          <AuthorComboBox
            label="Tác giả"
            onChange={(value) => {
              setValue('authorId', value as number, {
                shouldValidate: true,
              });
            }}
            value={getValues('authorId') as number}
            placeholder="=== Chọn tác giả ==="
            required
          />
          <PublisherCombobox
            label="Nhà xuất bản"
            onChange={(value) => {
              console.log(value);
              setValue('publisherId', value as number, {
                shouldValidate: true,
              });
            }}
            value={getValues('publisherId') as number}
            placeholder="=== Chọn nhà xuất bản ==="
            required
          />
          <CategoryComboBox
            label="Danh mục"
            onChange={(value) => {
              setValue('categoryId', value as number, {
                shouldValidate: true,
              });
            }}
            required
            value={getValues('categoryId') as number}
            placeholder="=== Chọn danh mục ==="
          />
          <ProviderComboBox
            label="Nhà cung cấp"
            onChange={(value) => {
              setValue('providerId', value as number, {
                shouldValidate: true,
              });
            }}
            required
            value={getValues('providerId') as number}
            placeholder="=== Chọn nhà cung cấp ==="
          />
          <SeriesComboBox
            label="Bộ sách"
            onChange={(value) => {
              setValue('seriesId', value as number, {
                shouldValidate: true,
              });
            }}
            value={getValues('seriesId') as number}
            placeholder="=== Chọn bộ sách ==="
          />
          <TextInputWithRef
            label="Ảnh minh họa"
            type="file"
            className="file-input file-input-bordered w-full"
            error={errors.thumbnail?.message}
            {...register('images', { required: false })}
            accept="image/*"
            multiple={true}
          />
        </fieldset>
        <fieldset className="border p-4 m-4 flex flex-col gap-y-4 rounded-lg">
          <legend className="text-base font-semibold">Thông tin khác</legend>
          <TextAreaWithRef
            label="Mô tả sách"
            required
            {...register('description', { required: false })}
            placeholder="Mô tả sách..."
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
              {...register('attributeName', { required: false })}
            />
            <TextInputWithRef
              label="Giá trị"
              type="text"
              {...register('attributeValue', { required: false })}
            />
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => {
                const { attributeName, attributeValue } = getValues();
                if (attributeName && attributeValue) {
                  setValue(
                    'bookAttributes',
                    [
                      ...getValues('bookAttributes'),
                      {
                        attributeName: attributeName,
                        attributeValue: attributeValue,
                      },
                    ],
                    { shouldValidate: true }
                  );
                }
                setValue('attributeName', '', { shouldValidate: false });
                setValue('attributeValue', '', { shouldValidate: false });
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
                        setValue(
                          'bookAttributes',
                          getValues('bookAttributes').filter(
                            (item, i) => i !== index
                          ),
                          { shouldValidate: true }
                        );
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
            disabled={isLoading}
          >
            <AiOutlineClear size={24} className="mr-2" />
            Clear
          </button>
          <button
            type="submit"
            className="btn btn-primary items-center"
            disabled={isLoading}
          >
            <AiOutlineSave size={24} className="mr-2" />
            {isLoading ? 'Đang tải lên...' : 'Thêm sách'}
          </button>
        </div>
      </form>
    </div>
  );
}
