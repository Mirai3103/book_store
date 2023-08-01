// using BookStore.Dto;
// using BookStore.Services.Interfaces;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using BookStore.Extensions;

import axios, { AxiosRequestConfig } from "axios";
import { AddressDto } from "../types/server-dto/addressDto";

export default class AddressApiService {
    public static async getMyAddress({
        accessToken,
        axiosConfig = {},
    }: {
        accessToken: string;
        axiosConfig?: AxiosRequestConfig;
    }) {
        const res = await axios.get<AddressDto[]>("address/my-addresses", {
            ...axiosConfig,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
    public static async createAddress({ accessToken, addressDto }: { accessToken: string; addressDto: AddressDto }) {
        const res = await axios.post<AddressDto>("address", addressDto, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
    public static async updateAddress({ accessToken, addressDto }: { accessToken: string; addressDto: AddressDto }) {
        const res = await axios.put<AddressDto>("address", addressDto, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
    public static async deleteAddress({ accessToken, addressId }: { accessToken: string; addressId: number }) {
        const res = await axios.delete<boolean>(`address/${addressId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
    public static async setPrimaryAddress({ accessToken, addressId }: { accessToken: string; addressId: number }) {
        const res = await axios.patch<boolean>(`address/set-primary/${addressId}`, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
    public static async getPrimaryAddress({ accessToken }: { accessToken: string }) {
        const res = await axios.get<AddressDto>("address/primary-address", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
    public static async getAddressById({ accessToken, addressId }: { accessToken: string; addressId: number }) {
        const res = await axios.get<AddressDto>(`address/${addressId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
}
