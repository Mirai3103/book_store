import authorApiService from '@shared/Utils/Services/authorApiService';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { useNotification } from '@shared/toast';
import { AuthorDto } from '@/types/authorDto';
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
    mutationFn: (createAuthorDto: Omit<AuthorDto, 'id'>) =>
      authorApiService.createAuthor(createAuthorDto),
    onSuccess: () => {
      toggle();
      show({ message: 'Đã tạo tác giả', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AuthorDto, any, AuthorDto>({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const onSubmit = (data: AuthorDto) => {
    mutate(data);
  };
  return (
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-xl">Tạo tác giả</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <TextInput
              error={errors.name?.message}
              type="text"
              label="Tên tác giả"
              placeholder="Nhập tên tác giả"
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
              Tạo tác giả
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
