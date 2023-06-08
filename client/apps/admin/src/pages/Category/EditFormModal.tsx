import categoryApiService from '@/Utils/Services/categoryApiService';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { useNotification } from '@shared/toast';
import { CategoryDto } from '@/types/categoryDto';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  oldData?: CategoryDto;
}

export default function EditFormModal({ isOpen, toggle, oldData }: IProps) {
  const { show } = useNotification();
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: (createCategoryDto: CategoryDto) =>
      categoryApiService.updateCategory(
        createCategoryDto.id,
        createCategoryDto
      ),
    onSuccess: () => {
      toggle();
      show({ message: 'Sửa danh mục thành công', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm<CategoryDto, any, CategoryDto>({
    defaultValues: {
      id: 0,
      name: '',
      description: '',
    },
  });
  const onSubmit = (data: CategoryDto) => {
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
          Sửa danh mục {oldData?.name || ''}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <TextInput
              label="Mã danh mục"
              error={errors.id?.message}
              type="text"
              placeholder="Mã danh mục"
              className="input input-bordered w-full "
              readOnly
              {...register('id', { required: true, disabled: true })}
            />

            <TextInput
              type="text"
              label="Tên danh mục"
              placeholder="Nhập tên danh mục"
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
              Tạo danh mục
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
