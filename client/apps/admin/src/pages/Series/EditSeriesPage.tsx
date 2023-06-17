import seriesApiService from '@/Utils/Services/seriesApiService';
import TextInputWithRef from '@/components/TextInput';
import { CreateSeriesDto, SeriesDto, UpdateSeriesDto } from '@/types/seriesDto';
import { useNotification } from '@client/libs/shared/src/lib/toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import AuthorComboBox from './AuthorComboBox';
import PublisherCombobox from './PublisherCombobox';
import TextAreaWithRef from '@/components/TextArea';
export default function EditSeriesPage() {
  // path: '/Series/edit/:id',
  const id = useParams().id;
  const { data, isLoading } = useQuery<SeriesDto, any, SeriesDto>({
    queryKey: ['series', id],
    queryFn: () => seriesApiService.getSeriesById(id || '0'),
  });
  const { show } = useNotification();
  const {
    isLoading: isLoadingEdit,
    error,
    mutate,
  } = useMutation({
    mutationFn: (createSeriesDto: CreateSeriesDto) => {
      return {} as any;
    },
    onSuccess: () => {
      show({ message: 'Đã sửa bộ sách', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm<UpdateSeriesDto, any, UpdateSeriesDto>({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data: UpdateSeriesDto) => {
    console.log({ data });
    // mutate(data);
  };

  React.useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('authorId', data.author!.id);
      setValue('publisherId', data.publisher!.id);
    }
  }, [data, setValue]);

  if (!id || (!data && !isLoading)) {
    return <Navigate to="/Series" />;
  }

  return (
    <div>
      <div className="flex items-center my-2 justify-between">
        <h1 className="font-semibold text-2xl">
          Sửa bộ truyện <span className="font-bold">{data?.name}</span>
        </h1>
        <button className="btn btn-error">Xoá bộ truyện</button>
      </div>
      <form className="flex px-10 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4">
          <TextInputWithRef
            error={errors.name?.message}
            type="text"
            label="Tên nhà bộ sách"
            placeholder="Nhập tên nhà bộ sách"
            className="input input-bordered w-full "
            {...register('name', {
              required: true,
              minLength: 3,
              maxLength: 50,
            })}
          />
          <AuthorComboBox
            onChange={(value) => {
              setValue('authorId', Number(value));
            }}
            value={getValues('authorId')}
            defaultSearchValue={data?.author?.name}
          ></AuthorComboBox>

          <PublisherCombobox
            onChange={(value) => {
              setValue('publisherId', Number(value));
            }}
            value={getValues('publisherId')}
            defaultSearchValue={data?.publisher?.name}
          ></PublisherCombobox>

          <TextAreaWithRef
            label="Chú thích"
            className="textarea textarea-bordered h-24"
            placeholder="Chú thích"
            {...register('description', { required: false })}
          ></TextAreaWithRef>
        </div>
        <div className="flex justify-end gap-x-4">
          <button
            className="btn"
            onClick={() => {
              navigate(-1);
            }}
            disabled={isLoading}
          >
            Quay lại
          </button>
          <button className="btn btn-primary" disabled={isLoadingEdit}>
            {isLoadingEdit ? 'Đang lưu' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
