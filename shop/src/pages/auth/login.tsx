import { LoginRequest } from "@/core/types/server-dto/authDto";
import { SfButton, SfCheckbox, SfIconLockOpen, SfIconPerson, SfInput } from "@storefront-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
    const { push, query } = useRouter();
    const { handleSubmit, register } = useForm<LoginRequest>({
        defaultValues: {
            isRemember: false,
            password: "",
            username: "",
        },
    });
    const onSubmit = (data: LoginRequest) => {
        if (data.isRemember) {
            data.isRemember = true;
        }
        signIn("credentials", { ...data, redirect: true, callbackUrl: (query.callbackUrl as string) || "/" });
    };
    return (
        <div className="w-full min-h-[80vh] grid place-content-center place-items-center">
            <form
                className="border shadow-lg flex flex-col gap-y-4 w-[30rem] rounded-md p-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="typography-headline-3">Đăng nhập</h2>
                <label>
                    <span className="text-sm  font-medium">Tên đăng nhập</span>
                    <SfInput type="text" {...register("username")} />
                </label>
                <label>
                    <span className="text-sm font-medium">Mật khẩu</span>
                    <SfInput type="password" {...register("password")} />
                </label>
                <div className="flex justify-between">
                    <div className="flex justify-center items-center">
                        <SfCheckbox
                            value="isRemember"
                            type="checkbox"
                            className="peer"
                            id="checkbox"
                            {...register("isRemember")}
                        />
                        <label
                            className="ml-3 text-base text-gray-900 cursor-pointer font-body peer-disabled:text-disabled-900"
                            htmlFor="checkbox"
                        >
                            Lưu đăng nhập ?
                        </label>
                    </div>
                    <a href="#" className="text-sm text-gray-900 hover:underline hover:text-blue-500">
                        Quên mật khẩu ?
                    </a>
                </div>
                <SfButton className="w-full mt-2" type="submit">
                    Đăng nhập
                </SfButton>
                <h4 className="text-sm text-center text-gray-900">Chưa có tài khoản ? </h4>
                <SfButton className="w-full mt-2 " variant="secondary" onClick={() => push("/auth/register")}>
                    Đăng ký
                </SfButton>
            </form>
        </div>
    );
}
