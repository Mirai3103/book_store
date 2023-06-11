import publisherApiService from '@/Utils/Services/publisherApiService';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { useNotification } from '@shared/toast';
import { PublisherDto } from '@/types/publisherDto';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function CreateFormModal({ isOpen, toggle }: IProps) {
  const { show } = useNotification();
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: (createPublisherDto: Omit<PublisherDto, 'id'>) =>
      publisherApiService.createPublisher(createPublisherDto),
    onSuccess: () => {
      toggle();
      show({ message: 'Đã tạo nhà xuất bản', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PublisherDto, any, PublisherDto>({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const onSubmit = (data: PublisherDto) => {
    mutate(data);
  };
  return (
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-xl">Tạo nhà xuất bản</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <TextInput
              error={errors.name?.message}
              type="text"
              label="Tên nhà xuất bản"
              placeholder="Nhập tên nhà xuất bản"
              className="input input-bordered w-full "
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
            />

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
              Tạo nhà xuất bản
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
