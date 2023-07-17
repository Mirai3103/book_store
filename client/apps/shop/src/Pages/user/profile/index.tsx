import { selectIsAuthenticated } from '@/redux/authSplice';
import { useAppSelector } from '@/redux/hook';
import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import userApiService from '@shared/Utils/Services/userApiService';
import { useForm } from 'react-hook-form';
import { Gender, UpdateUserDto } from '@shared/types/userDto';
import DateSelect from './DateSelect';
import {
  getDiffField,
  getServerImageURL,
} from '@client/libs/shared/src/lib/Utils';
import fileService from '@shared/Utils/Services/fileService';
import { useNotification } from '@client/libs/shared/src';

export default function Profile() {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryFn: () => userApiService.getUserProfile(),
    queryKey: ['userProfile'],
  });
  const toast = useNotification();
  const [isLoadingAvatar, setIsLoadingAvatar] = React.useState(false);
  const { setValue, register, getValues, handleSubmit } =
    useForm<UpdateUserDto>({
      defaultValues: {
        id: '',
        avatarUrl: '',
        birthday: '2003-09-13',
        displayName: '',
        email: '',
        gender: Gender.UNKNOWN,
        phoneNumber: '',
      },
    });
  React.useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('displayName', data.displayName);
      setValue('email', data.email);
      setValue('phoneNumber', data.phoneNumber);
      setValue('avatarUrl', data.avatarUrl);
      setValue('gender', data.gender + '');
      setValue('birthday', data.birthday);
    }
  }, [data, setValue]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  const handleUpdate = async (updateDto: UpdateUserDto) => {
    updateDto.gender = Number(updateDto.gender);
    const diff = getDiffField({
      newValue: updateDto,
      oldValue: data,
    });
    console.log(diff);
  };
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoadingAvatar(true);
    try {
      const url = await fileService.uploadFile(file);

      setValue('avatarUrl', url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingAvatar(false);
    }
  };
  return (
    <div className="p-8 -mt-6">
      <h3 className="text-2xl font-bold">Quản lý thông tin cá nhân của bạn</h3>
      <div className="flex flex-col">
        <div className="flex  flex-col">
          <label
            htmlFor="avatar-chosen"
            className="avatar cursor-pointer     justify-center items-center mx-auto"
          >
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  getServerImageURL(getValues('avatarUrl')) ||
                  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                }
                alt="x"
              />
            </div>
          </label>
          <div className="flex justify-center">
            <button className="btn btn-secondary  mt-4" disabled={isLoading}>
              <label htmlFor="avatar-chosen" className="">
                Chọn ảnh đại diện
              </label>
            </button>

            <input
              id="avatar-chosen"
              type="file"
              className="file-input mx-auto mt-4 w-full max-w-xs"
              hidden
              onChange={handleAvatarChange}
              accept=" image/png, image/jpeg"
            />
          </div>
        </div>
        <form
          className="grid items-center gap-4 mt-4  grid-cols-3"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="text-lg text-end pr-8">Mã người dùng:</div>
          <input
            type="text"
            className="input input-bordered w-full col-span-2"
            {...register('id', {
              disabled: true,
            })}
          />
          <div className="text-lg text-end pr-8">Tên người dùng:</div>
          <input
            type="text"
            className="input input-bordered w-full col-span-2"
            {...register('displayName')}
          />
          <div className="text-lg text-end pr-8">Email:</div>
          <div className="flex col-span-2 gap-3 items-center">
            <input
              type="text"
              className="input input-bordered w-full grow shrink "
              {...register('email', {
                disabled: true,
              })}
            />
            <button className="btn btn-secondary btn-sm mt-4">Thay đổi</button>
          </div>
          <div className="text-lg text-end pr-8">Số điện thoại:</div>
          <div className="flex col-span-2 gap-3 items-center">
            <input
              type="text"
              className="input input-bordered w-full grow shrink"
              {...register('phoneNumber', {
                disabled: true,
              })}
            />
            <button className="btn btn-secondary btn-sm mt-4">Thay đổi</button>
          </div>
          <div className="text-lg text-end pr-8">Giới tính:</div>
          <div className="form-control  flex gap-2 flex-row col-span-2">
            <label className="label justify-start gap-3 cursor-pointer">
              <input
                type="radio"
                className="radio checked:bg-blue-500"
                value={Gender.MALE}
                {...register('gender')}
              />
              <span className="label-text">
                <span className="text-lg">Nam</span>
              </span>
            </label>
            <label className="label justify-start gap-3 cursor-pointer">
              <input
                type="radio"
                className="radio checked:bg-blue-500"
                value={Gender.FEMALE}
                {...register('gender')}
              />
              <span className="label-text">
                <span className="text-lg">Nữ</span>
              </span>
            </label>
            <label className="label justify-start gap-3 cursor-pointer">
              <input
                type="radio"
                className="radio checked:bg-blue-500"
                value={Gender.UNKNOWN}
                {...register('gender')}
              />
              <span className="label-text">
                <span className="text-lg">Không xác định</span>
              </span>
            </label>
          </div>
          <div className="text-lg text-end pr-8">Ngày sinh:</div>
          <DateSelect
            onChange={(date) => {
              //to YYYY-MM-DD
              setValue('birthday', date.toISOString().split('T')[0]);
            }}
            value={new Date(getValues('birthday') || '2000-01-01')}
          />
          <div></div>
          <div className="flex col-span-3 justify-end gap-x-3 items-center">
            <button
              type="reset"
              className="btn btn-secondary btn-outline  mt-4"
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary  mt-4">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
