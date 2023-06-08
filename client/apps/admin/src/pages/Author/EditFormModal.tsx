import authorApiService from '@/Utils/Services/authorApiService';
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
  oldData?: AuthorDto;
}

export default function EditFormModal({ isOpen, toggle, oldData }: IProps) {
  const { show } = useNotification();
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: (createAuthorDto: AuthorDto) =>
      authorApiService.updateAuthor(createAuthorDto.id, createAuthorDto),
    onSuccess: () => {
      toggle();
      show({ message: 'Sửa tác giả thành công', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm<AuthorDto, any, AuthorDto>({
    defaultValues: {
      id: 0,
      name: '',
      description: '',
    },
  });
  const onSubmit = (data: AuthorDto) => {
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
        <h3 className="font-bold text-xl">Sửa tác giả {oldData?.name || ''}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <TextInput
              label="Mã tác giả"
              error={errors.id?.message}
              type="text"
              placeholder="Mã tác giả"
              className="input input-bordered w-full "
              readOnly
              {...register('id', { required: true, disabled: true })}
            />

            <TextInput
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
