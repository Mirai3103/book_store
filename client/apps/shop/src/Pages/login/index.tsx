import React from 'react';
import { LoginRequest } from '@shared/types/authDto';
import TextInput from '@shared/TextInput';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authApiService from '@client/libs/shared/src/lib/Utils/Services/authApiService';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { login, selectIsAuthenticated } from '@/redux/authSplice';
import { useNotification } from '@client/libs/shared/src';
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest, any, LoginRequest>({
    defaultValues: {
      username: '',
      password: '',
      isRemember: false,
    },
  });
  const dispatch = useAppDispatch();
  const toast = useNotification();
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const onSubmit = handleSubmit((data) => {
    authApiService.login(data).then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(login(res));
      toast.show({
        message: 'Đăng nhập thành công',
        type: 'success',
        duration: 3000,
      });
      const redirectUrl = URLSearchParams.get('redirectUrl');
      if (redirectUrl) {
        return navigate(redirectUrl);
      } else {
        return navigate('/');
      }
    });
  });
  React.useEffect(() => {
    if (isAuthenticated) {
      toast.show({
        message: 'Bạn đã đăng nhập',
        type: 'success',
        duration: 3000,
      });
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid min-h-[80vh] place-items-center place-content-center">
      <div className="card w-[29rem]  rounded-none bg-base-100 shadow-xl">
        <form className="card-body gap-y-3" onSubmit={onSubmit}>
          <div className="items-center flex flex-col gap-2">
            <h2 className="card-title text-3xl text-center font-bold">
              Đăng nhập tài khoản
            </h2>
            <p className="text-center">
              Nếu bạn chưa có tài khoản, vui lòng{' '}
              <Link to={'/register'} className="link-primary hover:underline">
                đăng ký tại đây
              </Link>
            </p>
          </div>
          <div>
            <TextInput
              label="Tên đăng nhập"
              type="text"
              placeholder="Số điện thoại hoặc email"
              required
              {...register('username', {
                required: 'Tên đăng nhập không được để trống',
              })}
            />
            <TextInput
              label="Mật khẩu"
              type="password"
              placeholder="Mật khẩu"
              required
              {...register('password', {
                required: 'Mật khẩu không được để trống',
              })}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox-primary checkbox checkbox-xs"
                {...register('isRemember')}
              />
              <span>Ghi nhớ đăng nhập</span>
            </div>
            <a href="#" className="text-primary">
              Quên mật khẩu?
            </a>
          </div>

          <div className="card-actions mt-3 justify-center items-center">
            <button className="btn btn-primary" type="submit">
              <span>Đăng nhập</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
