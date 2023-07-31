import UserLayout from "@/components/user/UserLayout";
import UserApiService from "@/core/services/userApiService";
import { AppSession } from "@/core/types/next-auth.type";
import { Gender, UpdateUserDto, UserDto } from "@/core/types/server-dto/userDto";
import useStore from "@/libs/hooks/useStore";
import { AUTH_OPTIONS } from "@/pages/api/auth/[...nextauth]";
import useSessionStore from "@/store/sessionStore";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import { getDiffField, getServerImageURL } from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import DateSelect from "@/components/DateSelect";
import Image from "next/image";
import { SfButton, SfInput, SfRadio } from "@storefront-ui/react";
import FileService from "@/core/services/fileService";
interface Props {
    user: UserDto;
}

function ProfilePage({ user }: Props) {
    const { session } = useStore(useSessionStore, (state) => state);
    const [isLoadingAvatar, setIsLoadingAvatar] = React.useState(false);
    const {
        setValue,
        register,
        getValues,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<UpdateUserDto>({
        defaultValues: {
            id: user.id,
            avatarUrl: user.avatarUrl,
            birthday: user.birthday,
            displayName: user.displayName,
            email: user.email,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
        },
        resetOptions: {
            keepDefaultValues: true,
        },
    });
    console.log(getValues(), { user });
    const { toast } = useToast();
    const handleUpdate = async (updateDto: UpdateUserDto) => {
        updateDto.gender = Number(updateDto.gender);
        const diff = getDiffField<UpdateUserDto>({
            newValue: updateDto,
            oldValue: user,
        });

        diff.id = user.id;

        UserApiService.updateUserProfile(diff as any, session!.accessToken)
            .then((res) => {
                if (res) {
                    toast({
                        variant: "success",
                        description: "Cập nhật thông tin thành công",
                        title: "Thành công",
                    });
                }
            })
            .catch((e) => {
                toast({
                    variant: "error",
                    description: "Cập nhật thông tin thất bại",
                    title: "Thất bại",
                });
            });
    };
    const handleRadioGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if (checked) {
            setValue("gender", Number(value));
        }
    };

    const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsLoadingAvatar(true);
        FileService.uploadFile(file, session?.accessToken || "")
            .then((res) => {
                if (res) {
                    setValue("avatarUrl", res);
                }
            })
            .finally(() => {
                setIsLoadingAvatar(false);
            });
    };

    return (
        <>
            <h2 className="typography-headline-3 font-semibold">Thông tin tài khoản</h2>
            <div className="flex flex-col">
                <div className="flex flex-col ">
                    <label
                        htmlFor="avatar-chosen"
                        className="avatar cursor-pointer justify-center items-center mx-auto"
                    >
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <Image
                                src={
                                    getServerImageURL(watch("avatarUrl")) ||
                                    "https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-0.jpg"
                                }
                                className="rounded-full aspect-square"
                                alt="x"
                                width={200}
                                height={200}
                            />
                        </div>
                    </label>
                    <div className="flex justify-center">
                        <SfButton className="bg-secondary-600  mt-4" disabled={isLoadingAvatar}>
                            <label htmlFor="avatar-chosen" className="">
                                Chọn ảnh đại diện
                            </label>
                        </SfButton>

                        <input
                            id="avatar-chosen"
                            type="file"
                            className="file-input mx-auto mt-4 w-full max-w-xs"
                            hidden
                            accept=" image/png, image/jpeg"
                            disabled={isLoadingAvatar}
                            onChange={onChangeAvatar}
                        />
                    </div>
                </div>
                <form
                    className=" gap-4 mt-4 max-w-lg w-full  mx-auto flex flex-col"
                    onSubmit={handleSubmit(handleUpdate)}
                    onReset={(e) => {
                        e.preventDefault();
                        reset();
                    }}
                >
                    <label>
                        <span className="typography-label-sm font-medium">Mã tài khoản</span>
                        <SfInput disabled required {...register("id", { required: true, disabled: true })} />
                        {errors.id && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">
                                {errors.id.message}
                            </p>
                        )}
                    </label>
                    <label>
                        <span className="typography-label-sm font-medium">Tên người dùng</span>
                        <SfInput required {...register("displayName", { required: true })} />
                        {errors.displayName && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">
                                {errors.displayName.message}
                            </p>
                        )}
                    </label>
                    <label>
                        <span className="typography-label-sm font-medium">Email</span>
                        <SfInput required {...register("email", { required: true })} />
                        {errors.email && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">
                                {errors.email.message}
                            </p>
                        )}
                    </label>
                    <label>
                        <span className="typography-label-sm font-medium">Số điện thoại</span>
                        <SfInput {...register("phoneNumber")} />
                        {errors.phoneNumber && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </label>
                    <div>
                        <span className="typography-label-sm font-medium">Giới tính</span>
                        <div className="flex gap-4">
                            <label className="flex items-center mx-4 cursor-pointer">
                                <SfRadio
                                    type="radio"
                                    value={Gender.FEMALE}
                                    checked={watch("gender") == Gender.FEMALE}
                                    onChange={handleRadioGenderChange}
                                />

                                <span className="ml-2 text-base font-normal leading-6 font-body">{` Nữ`}</span>
                            </label>
                            <label className="flex items-center mx-4 cursor-pointer">
                                <SfRadio
                                    type="radio"
                                    value={Gender.MALE}
                                    checked={watch("gender") == Gender.MALE}
                                    onChange={handleRadioGenderChange}
                                />

                                <span className="ml-2 text-base font-normal leading-6 font-body">{` Nam`}</span>
                            </label>
                            <label className="flex items-center mx-4 cursor-pointer">
                                <SfRadio
                                    type="radio"
                                    value={Gender.UNKNOWN}
                                    onChange={handleRadioGenderChange}
                                    checked={watch("gender") == Gender.UNKNOWN}
                                />

                                <span className="ml-2 text-base font-normal leading-6 font-body">{`Không xác định`}</span>
                            </label>
                        </div>
                        <label>
                            <span className="typography-label-sm mt-5 font-medium">Ngày sinh</span>
                            <DateSelect
                                onChange={(date) => {
                                    setValue("birthday", date);
                                }}
                                value={watch("birthday") || new Date()}
                            />
                        </label>
                    </div>
                    <div className="flex col-span-3 justify-end gap-x-3 items-center">
                        <SfButton variant="tertiary" type="reset" className=" mt-4">
                            Reset
                        </SfButton>
                        <SfButton type="submit" className=" mt-4">
                            Cập nhật
                        </SfButton>
                    </div>
                </form>
            </div>
        </>
    );
}
ProfilePage.Layout = UserLayout;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = (await getServerSession(context.req, context.res, AUTH_OPTIONS)) as AppSession;
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const user = await UserApiService.getUserProfile(session.accessToken, {
        baseURL: process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL,
    });
    return {
        props: {
            user,
        },
    };
};
export default ProfilePage;
