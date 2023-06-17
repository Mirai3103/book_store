import seriesApiService from '@/Utils/Services/seriesApiService';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { useNotification } from '@shared/toast';
import ComboBox from '@shared/combobox';
import { CreateSeriesDto, SeriesDto } from '@/types/seriesDto';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useDebounceState } from '@client/libs/shared/src/lib/hooks';
import authorApiService from '@/Utils/Services/authorApiService';
import publisherApiService from '@/Utils/Services/publisherApiService';
import { AuthorDto } from '@/types/authorDto';
import { PaginationDto } from '@/types/paginationDto';
import { MdOutlineCheckCircleOutline } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
import { PublisherDto } from '@/types/publisherDto';
import AuthorComboBox from './AuthorComboBox';
import PublisherCombobox from './PublisherCombobox';
interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function CreateFormModal({ isOpen, toggle }: IProps) {
  const { show } = useNotification();
  const { isLoading, error, mutate } = useMutation({
    mutationFn: (createSeriesDto: CreateSeriesDto) =>
      seriesApiService.createSeries(createSeriesDto),
    onSuccess: () => {
      toggle();
      show({ message: 'Đã tạo bộ sách', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateSeriesDto, any, CreateSeriesDto>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (data: CreateSeriesDto) => {
    mutate(data);
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-xl">Tạo bộ sách</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <TextInput
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
            ></AuthorComboBox>

            <PublisherCombobox
              onChange={(value) => {
                setValue('publisherId', Number(value));
              }}
              value={getValues('publisherId')}
            ></PublisherCombobox>

            <TextArea
              label="Chú thích"
              className="textarea textarea-bordered h-24"
              placeholder="Chú thích"
              {...register('description', { required: false })}
            ></TextArea>
          </div>
          <div className="flex justify-end gap-x-4">
            <button
              className="btn"
              onClick={() => {
                toggle();
              }}
              disabled={isLoading}
            >
              Hủy
            </button>
            <button className="btn btn-primary" disabled={isLoading}>
              Tạo bộ sách
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            toggle();
          }}
          disabled={isLoading}
        >
          close
        </button>
      </form>
    </dialog>
  );
}
