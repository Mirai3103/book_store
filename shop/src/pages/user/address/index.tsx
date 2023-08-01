import AddressCard from "@/components/address/AddressCard";
import CreateAddressModal from "@/components/address/CreateAddressModal";
import UserLayout from "@/components/user/UserLayout";
import AddressApiService from "@/core/services/addressApiService";
import { AppSession } from "@/core/types/next-auth.type";
import { AddressDto } from "@/core/types/server-dto/addressDto";
import { AUTH_OPTIONS } from "@/pages/api/auth/[...nextauth]";
import { SfButton, useDisclosure } from "@storefront-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";

interface Props {
    addresses: AddressDto[];
}

function AddressPage({ addresses }: Props) {
    const { isOpen, open, close } = useDisclosure({ initialValue: false });
    const [addressList, setAddressList] = React.useState<AddressDto[]>(addresses);
    const onCreated = React.useCallback(
        (address: AddressDto) => {
            setAddressList((prev) => [...prev, address]);
        },
        [setAddressList]
    );
    const handleDeleted = React.useCallback(
        (id: number) => {
            setAddressList((prev) => prev.filter((address) => address.id !== id));
        },
        [setAddressList]
    );
    const setPrimary = React.useCallback(
        (id: number) => {
            setAddressList((prev) =>
                prev.map((address) => ({
                    ...address,
                    isPrimary: address.id == id,
                }))
            );
        },
        [setAddressList]
    );
    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="typography-headline-3 font-semibold">Địa chỉ của tôi</h2>
                <SfButton className="bg-primary text-white" onClick={open}>
                    Thêm địa chỉ mới
                </SfButton>
            </div>
            <div className="mt-6 flex flex-col">
                {addressList.map((address) => (
                    <AddressCard
                        key={address.id}
                        address={address}
                        className="mb-4"
                        onDeleted={handleDeleted}
                        onSetPrimary={setPrimary}
                    />
                ))}
            </div>
            <CreateAddressModal isOpen={isOpen} close={close} onCreated={onCreated} />
        </>
    );
}
AddressPage.Layout = UserLayout;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = (await getServerSession(req, res, AUTH_OPTIONS)) as AppSession;
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const addresses = await AddressApiService.getMyAddress({
        accessToken: session.accessToken,
        axiosConfig: {
            baseURL: process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL,
        },
    });
    return {
        props: {
            addresses,
        },
    };
};

export default AddressPage;
