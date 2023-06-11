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
  oldData?: PublisherDto;
}

export default function EditFormModal({ isOpen, toggle, oldData }: IProps) {
  const { show } = useNotification();
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: (createPublisherDto: PublisherDto) =>
      publisherApiService.updatePublisher(
        createPublisherDto.id,
        createPublisherDto
      ),
    onSuccess: () => {
      toggle();
      show({ message: 'Sửa nhà xuất bản thành công', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm<PublisherDto, any, PublisherDto>({
    defaultValues: {
      id: 0,
      name: '',
      description: '',
    },
  });
  const onSubmit = (data: PublisherDto) => {
    console.log(data);
    mutate(data);
  };
  React.useEffect(() => {
    if (oldData) {
      setValue('id', oldData.id);
      setValue('name', oldData.name);
      setValue('description', oldData.description);
    }
  }, [oldData, setValue]);
  return (
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-xl">
          Sửa nhà xuất bản {oldData?.name || ''}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <TextInput
              label="Mã nhà xuất bản"
              error={errors.id?.message}
              type="text"
              placeholder="Mã nhà xuất bản"
              className="input input-bordered w-full "
              readOnly
              {...register('id', { required: true, disabled: true })}
            />

            <TextInput
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
