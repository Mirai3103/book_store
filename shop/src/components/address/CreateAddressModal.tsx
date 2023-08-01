import { AddressDto } from "@/core/types/server-dto/addressDto";
import { SfButton, SfCheckbox, SfIconClose, SfInput, SfModal, SfTextarea } from "@storefront-ui/react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import AddressPicker from "./AddressPicker";
import { useToast } from "../ui/use-toast";
import AddressApiService from "@/core/services/addressApiService";
import useStore from "@/libs/hooks/useStore";
import useSessionStore from "@/store/sessionStore";
interface Props {
    onCreated?: (address: AddressDto) => void;
    isOpen: boolean;
    close: () => void;
}

export default function CreateAddressModal({ onCreated, isOpen, close }: Props) {
    const backdropRef = useRef<HTMLDivElement>(null);
    const {
        formState: { errors },
        watch,
        handleSubmit,
        register,
        reset,
        setValue,
    } = useForm<AddressDto>({});
    const onChangeAddress = React.useCallback(
        (
            address:
                | {
                      province: string;
                      district: string;
                      ward: string;
                  }
                | undefined
        ) => {
            if (!address) return;
            setValue("province", address.province);
            setValue("district", address.district);
            setValue("ward", address.ward);
        },
        [setValue]
    );
    const accessToken = useStore(useSessionStore, (state) => state.session?.accessToken)!;
    const { toast } = useToast();
    const onSubmit = (data: AddressDto) => {
        data.isPrimary = !!data.isPrimary;
        AddressApiService.createAddress({
            addressDto: data,
            accessToken,
        })
            .then((res) => {
                toast({
                    title: "Thành công",
                    description: "Đã thêm địa chỉ mới",
                    variant: "success",
                });
                onCreated?.(res);
            })
            .catch((err) => {
                toast({
                    title: "Thất bại",
                    description: "Đã có lỗi xảy ra khi thêm địa chỉ mới",
                    variant: "error",
                });
            })
            .finally(() => {
                close();
                reset();
            });
    };

    return (
        <>
            <CSSTransition
                in={isOpen}
                nodeRef={backdropRef}
                timeout={0}
                unmountOnExit
                classNames={{
                    enter: "opacity-0",
                    enterDone: "opacity-100 transition duration-200 ease-out",
                    exitActive: "opacity-0 transition duration-200 ease-out",
                }}
            >
                <div ref={backdropRef} className="fixed inset-0 bg-neutral-700 bg-opacity-50" />
            </CSSTransition>
            <SfModal
                open={isOpen}
                onClose={close}
                className="max-w-[90%]  w-full md:max-w-lg"
                as="section"
                role="alertdialog"
                aria-labelledby="promoModalTitle"
                aria-describedby="promoModalDesc"
            >
                <header>
                    <SfButton square variant="tertiary" className="absolute right-2 top-2" onClick={close}>
                        <SfIconClose />
                    </SfButton>
                    <h3 id="promoModalTitle" className="font-bold typography-headline-4 md:typography-headline-3">
                        Tạo địa chỉ mới
                    </h3>
                </header>
                <form
                    onReset={() => reset()}
                    className="flex flex-col gap-y-2 min-w-[300px] max-h-[70vh] overflow-y-auto px-2 "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-2 gap-x-3">
                        <div>
                            <label>
                                <span className="text-sm font-medium ">
                                    Tên người nhận <span className="text-negative-600">*</span>
                                </span>
                                <SfInput
                                    {...register("receiverName", {
                                        required: "Vui lòng nhập tên người nhận",
                                        minLength: {
                                            value: 2,
                                            message: "Tên người nhận phải có ít nhất 2 ký tự",
                                        },
                                    })}
                                />
                            </label>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-negative-600 mt-0.5">{errors.receiverName?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>
                                <span className="text-sm font-medium">
                                    Số điện thoại <span className="text-negative-600">*</span>
                                </span>
                                <SfInput
                                    {...register("phoneNumber", {
                                        required: "Vui lòng nhập số điện thoại",
                                        pattern: {
                                            value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                                            message: "Số điện thoại không hợp lệ",
                                        },
                                    })}
                                />
                            </label>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-negative-600 mt-0.5">{errors.phoneNumber?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddressPicker
                        className="flex-col"
                        districtError={errors.district?.message}
                        provinceError={errors.province?.message}
                        wardError={errors.ward?.message}
                        onChangeAddress={onChangeAddress}
                    />
                    <div>
                        <label className="flex flex-col">
                            <span className="text-sm font-medium">
                                Địa chỉ cụ thể <span className="text-negative-600">*</span>
                            </span>
                            <SfTextarea
                                className="resize-none mt-2"
                                rows={2}
                                {...register("particularAddress", {
                                    required: "Vui lòng nhập địa chỉ cụ thể",
                                })}
                            />
                        </label>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-xs text-negative-600 mt-0.5">{errors.particularAddress?.message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <SfCheckbox value={"true"} {...register("isPrimary")} />
                        <label
                            className="ml-3 text-base text-gray-900 cursor-pointer font-body peer-disabled:text-disabled-900"
                            htmlFor="checkbox"
                        >
                            Đặt làm địa chỉ mặc định
                        </label>
                    </div>
                </form>
                <footer className="flex justify-end gap-4 mt-4">
                    <SfButton type="reset" variant="secondary" onClick={close}>
                        Huỷ
                    </SfButton>
                    <SfButton type="submit" variant="primary" onClick={handleSubmit(onSubmit)}>
                        Tạo
                    </SfButton>
                </footer>
            </SfModal>
        </>
    );
}
