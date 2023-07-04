import providerApiService from '@shared/Utils/Services/providerApiService';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { useNotification } from '@shared/toast';
import { ProviderDto } from '@/types/providerDto';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  oldData?: ProviderDto;
}

export default function EditFormModal({ isOpen, toggle, oldData }: IProps) {
  const { show } = useNotification();
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: (createProviderDto: ProviderDto) =>
      providerApiService.updateProvider(
        createProviderDto.id,
        createProviderDto
      ),
    onSuccess: () => {
      toggle();
      show({ message: 'Sửa nhà cung cấp thành công', type: 'success' });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm<ProviderDto, any, ProviderDto>({
    defaultValues: {
      id: 0,
      name: '',
      description: '',
    },
  });
  const onSubmit = (data: ProviderDto) => {
    mutate(data);
  };
  React.useEffect(() => {
    if (oldData) {
      setValue('id', oldData.id, {
        shouldValidate: true,
      });
      setValue('name', oldData.name, {
        shouldValidate: true,
      });
      setValue('description', oldData.description, {
        shouldValidate: true,
      });
    }
  }, [oldData, setValue]);
  return (
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-xl">
          Sửa nhà cung cấp {oldData?.name || ''}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <TextInput
              label="Mã nhà cung cấp"
              error={errors.id?.message}
              type="text"
              placeholder="Mã nhà cung cấp"
              className="input input-bordered w-full "
              readOnly
              {...register('id', { required: true, disabled: true })}
            />

            <TextInput
              type="text"
              label="Tên nhà cung cấp"
              placeholder="Nhập tên nhà cung cấp"
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
              Tạo nhà cung cấp
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
