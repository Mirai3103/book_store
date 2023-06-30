import React from 'react';
import { RegisterRequest } from '@shared/types/authDto';
import authApiService from '@shared/Utils/Services/authApiService';
import TextInput from '@shared/TextInput';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { login, selectIsAuthenticated } from '@/redux/authSplice';
import { useNotification } from '@client/libs/shared/src';
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest, any, RegisterRequest>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const toast = useNotification();
  const onSubmit = handleSubmit((data) => {
    authApiService.register(data).then((res) => {
      authApiService.register(data).then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        toast.show({
          message: 'Đăng ký thành công',
          type: 'success',
          duration: 3000,
        });
        dispatch(login(res));
        navigate('/');
      });
    });
  });
  React.useEffect(() => {
    if (isAuth) {
      toast.show({
        message: 'Bạn đã đăng nhập',
        type: 'success',
        duration: 3000,
      });
    }
  }, []);

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className="grid min-h-[80vh] place-items-center place-content-center">
      <form
        className="card w-[29rem]  rounded-none bg-base-100 shadow-xl"
        onSubmit={onSubmit}
      >
        <div className="card-body gap-y-3">
          <div className="items-center flex flex-col gap-2">
            <h2 className="card-title text-3xl text-center font-bold">
              Đăng ký tài khoản
            </h2>
            <p className="text-center">
              Nếu bạn đã có tài khoản, vui lòng{' '}
              <Link to={'/login'} className="link-primary hover:underline">
                đăng nhập tại đây
              </Link>
            </p>
          </div>
          <div>
            <TextInput
              label="Email"
              type="email"
              error={errors.email?.message}
              placeholder="Email"
              {...register('email', {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email không hợp lệ',
                },
                required: 'Email không được để trống',
              })}
            />
            <TextInput
              label="Họ và tên"
              type="text"
              error={errors.displayName?.message}
              placeholder="Họ và tên"
              required
              {...register('displayName', {
                required: 'Họ và tên không được để trống',
                maxLength: {
                  value: 30,
                  message: 'Họ và tên không được quá 30 ký tự',
                },
                minLength: {
                  value: 6,
                  message: 'Họ và tên không được ít hơn 6 ký tự',
                },
              })}
            />
            <TextInput
              label="Mật khẩu"
              type="password"
              error={errors.password?.message}
              placeholder="Mật khẩu"
              required
              {...register('password', {
                required: 'Mật khẩu không được để trống',
                maxLength: {
                  value: 30,
                  message: 'Mật khẩu không được quá 30 ký tự',
                },
                minLength: {
                  value: 6,
                  message: 'Mật khẩu không được ít hơn 6 ký tự',
                },
              })}
            />
          </div>
          <p>
            Bằng việc đăng ký, bạn đã đồng ý với{' '}
            <Link to={'/register'} className="link-primary hover:underline">
              Điều khoản dịch vụ
            </Link>{' '}
            và{' '}
            <Link to={'/register'} className="link-primary hover:underline">
              Chính sách bảo mật của chúng tôi
            </Link>
          </p>

          <div className="card-actions mt-3 justify-center items-center">
            <button className="btn btn-primary" type="submit">
              <span>Đăng ký</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
