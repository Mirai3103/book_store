import { AddressDto } from "@/core/types/server-dto/addressDto";
import { mergeClassNames } from "@/utils";
import { SfButton } from "@storefront-ui/react";
import React from "react";
import { useToast } from "../ui/use-toast";
import AddressApiService from "@/core/services/addressApiService";
import useStore from "@/libs/hooks/useStore";
import { useSession } from "next-auth/react";
import useSessionStore from "@/store/sessionStore";

const hardCodeData: AddressDto = {
    id: 1,
    district: "Quận 1",
    isPrimary: true,
    particularAddress: "45 Lê Duẩn",
    phoneNumber: "0123456789",
    province: "Hồ Chí Minh",
    receiverName: "Nguyễn Văn A",
    userId: "sfsdf-sdfsdf-sdfsdf",
    ward: "Bến Nghé",
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    address?: AddressDto;
    onDeleted?: (id: number) => void;
    onSetPrimary?: (id: number) => void;
}

export default function AddressCard({
    address = hardCodeData,
    onSetPrimary,
    onDeleted,
    className = "",
    ...props
}: Props) {
    const { toast } = useToast();
    const accessToken = useStore(useSessionStore, (state) => state.session?.accessToken)!;
    const handleDelete = () => {
        AddressApiService.deleteAddress({
            accessToken,
            addressId: address.id,
        })
            .then(() => {
                toast({
                    title: "Xóa địa chỉ thành công",
                    variant: "success",
                });
                onDeleted?.(address.id);
            })
            .catch(() => {
                toast({
                    title: "Xóa địa chỉ thất bại",
                    variant: "error",
                });
            });
    };

    const handleSetPrimary = () => {
        AddressApiService.setPrimaryAddress({
            accessToken,
            addressId: address.id,
        })
            .then(() => {
                toast({
                    title: "Đặt địa chỉ mặc định thành công",
                    variant: "success",
                });
                onSetPrimary?.(address.id);
            })
            .catch(() => {
                toast({
                    title: "Đặt địa chỉ mặc định thất bại",
                    variant: "error",
                });
            });
    };

    return (
        <div className={mergeClassNames("flex hover:shadow border-b py-4 justify-between px-10", className)} {...props}>
            <div className="flex typography-text-base flex-col gap-1">
                <div>
                    <span className="font-semibold">{address.receiverName}</span>
                    <span className="text-gray-500"> | {address.phoneNumber}</span>
                </div>
                <div>
                    <span className="text-gray-500">{address.particularAddress}</span>
                </div>
                <div className="text-gray-500">
                    {address.ward}, {address.district}, {address.province}
                </div>
                {address.isPrimary && (
                    <div>
                        <span className="text-primary-600  p-1 rounded-md border border-primary-700">Mặc định</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center gap-2 items-center">
                <div className="flex gap-x-2">
                    <SfButton className="bg-secondary-600 hover:bg-secondary-700 text-white" onClick={handleDelete}>
                        Sửa
                    </SfButton>
                    <SfButton className="bg-negative-600 hover:bg-negative-700 text-white" onClick={handleDelete}>
                        Xóa
                    </SfButton>
                </div>
                <div>
                    <SfButton variant="tertiary" className="" disabled={address.isPrimary} onClick={handleSetPrimary}>
                        Đặt làm mặc định
                    </SfButton>
                </div>
            </div>
        </div>
    );
}
