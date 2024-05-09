import { useToast } from "@/components/ui/use-toast";
import AuthApiService from "@/core/services/authApiService";
import { RegisterRequest } from "@/core/types/server-dto/authDto";
import { SfButton, SfInput } from "@storefront-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function Register() {
    const { push, query } = useRouter();
    const { handleSubmit, register } = useForm<RegisterRequest>({
        defaultValues: {
            password: "",
            displayName: "",
            email: "",
        },
    });
    const { toast } = useToast();
    const onSubmit = (data: RegisterRequest) => {
        AuthApiService.register(data)
            .then(() => {
                toast({
                    variant: "success",
                    title: "Thành công",
                    description: "Đăng ký thành công!, mời đăng nhập",
                });
                push("/auth/login");
            })
            .catch((e) => {
                toast({
                    variant: "error",
                    title: "Lỗi",
                    description: "Đăng ký thất bại! - " + (e.message || ""),
                });
            });
    };
    return (
        <div className="w-full min-h-[80vh] grid place-content-center place-items-center">
            <form
                className="border shadow-lg flex flex-col gap-y-4 w-[30rem] rounded-md p-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="typography-headline-3">Đăng Ký</h2>
                <label>
                    <span className="text-sm  font-medium">Họ và tên</span>
                    <SfInput type="text" {...register("displayName")} />
                </label>
                <label>
                    <span className="text-sm  font-medium">Email</span>
                    <SfInput type="text" {...register("email")} />
                </label>
                <label>
                    <span className="text-sm font-medium">Mật khẩu</span>
                    <SfInput type="password" {...register("password")} />
                </label>

                <SfButton className="w-full mt-2" type="submit">
                    Đăng ký
                </SfButton>
                <h4 className="text-sm text-center text-gray-900">Đã có tài khoản ? </h4>
                <SfButton className="w-full mt-2 " variant="secondary" onClick={() => push("/auth/login")}>
                    Đăng nhập
                </SfButton>
            </form>
        </div>
    );
}
