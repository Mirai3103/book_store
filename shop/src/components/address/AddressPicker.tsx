import { AddressDto } from "@/core/types/server-dto/addressDto";
import axios from "axios";
import React from "react";
import SelectDropdown from "../Select";
import { cn } from "@/utils";

interface Props {
    province?: string;
    district?: string;
    ward?: string;
    onChangeAddress?: (address: { province: string; district: string; ward: string }) => void;
    provinceError?: string;
    districtError?: string;
    wardError?: string;
    className?: string;
}

interface AddressObj {
    name: string;
    slug: string;
    code: string;
    type: string;
    name_with_type: string;
}

export default function AddressPicker({
    province,
    district,
    ward,
    onChangeAddress,
    districtError,
    provinceError,
    wardError,
    className = "",
}: Props) {
    const [provincesOptions, setProvincesOptions] = React.useState<AddressObj[]>([]);
    const [districtsOptions, setDistrictsOptions] = React.useState<AddressObj[]>([]);
    const [wardsOptions, setWardsOptions] = React.useState<AddressObj[]>([]);
    const [selectedProvince, setSelectedProvince] = React.useState<AddressObj | undefined>();
    const [selectedDistrict, setSelectedDistrict] = React.useState<AddressObj | undefined>();
    const [selectedWard, setSelectedWard] = React.useState<AddressObj | undefined>();

    React.useEffect(() => {
        import("../../../public/data/tinh_tp.json" as any).then((res) => {
            const provinces = Object.values(res);
            setProvincesOptions(provinces as AddressObj[]);
        });
    }, []);
    React.useEffect(() => {
        if (selectedProvince) {
            import(`../../../public/data/quan-huyen/${selectedProvince.code}.json`).then((res) => {
                const districts = Object.values(res);
                setDistrictsOptions(districts as AddressObj[]);
            });
        }
    }, [selectedProvince]);
    React.useEffect(() => {
        if (selectedDistrict) {
            import(`../../../public/data/xa-phuong/${selectedDistrict.code}.json`).then((res) => {
                const wards = Object.values(res);
                setWardsOptions(wards as AddressObj[]);
            });
        }
    }, [selectedDistrict]);
    React.useEffect(() => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            onChangeAddress?.({
                district: selectedDistrict.name_with_type,
                province: selectedProvince.name_with_type,
                ward: selectedWard.name_with_type,
            });
        }
    }, [selectedProvince, selectedDistrict, selectedWard, onChangeAddress]);

    return (
        <div className={cn("flex flex-row gap-x-4", className)}>
            <SelectDropdown
                error={provinceError}
                onChange={(value) => {
                    const province = provincesOptions.find((item) => item.code === value.value);
                    setSelectedProvince(province);
                }}
                options={provincesOptions.map((item) => ({ label: item.name_with_type, value: item.code }))}
                defaultText={province}
                placeholder="Chọn Tỉnh/Thành phố"
                label="Tỉnh/Thành phố"
                selectedOption={
                    provincesOptions
                        .map((item) => ({ label: item.name_with_type, value: item.code }))
                        .find((item) => item.value && item.value == selectedProvince?.code) || undefined
                }
            />
            <SelectDropdown
                error={districtError}
                onChange={(value) => {
                    const district = districtsOptions.find((item) => item.code === value.value);
                    setSelectedDistrict(district);
                }}
                disabled={!selectedProvince}
                options={districtsOptions.map((item) => ({ label: item.name_with_type, value: item.code }))}
                defaultText={district}
                placeholder="Chọn Quận/Huyện"
                label="Quận/Huyện"
                selectedOption={
                    districtsOptions
                        .map((item) => ({ label: item.name_with_type, value: item.code }))
                        .find((item) => item.value && item.value == selectedDistrict?.code) || undefined
                }
            />
            <SelectDropdown
                error={wardError}
                disabled={!selectedDistrict}
                onChange={(value) => {
                    const ward = wardsOptions.find((item) => item.code === value.value);
                    setSelectedWard(ward);
                }}
                options={wardsOptions.map((item) => ({ label: item.name_with_type, value: item.code }))}
                defaultText={ward}
                placeholder="Chọn Phường/Xã"
                label="Phường/Xã"
                selectedOption={
                    wardsOptions
                        .map((item) => ({ label: item.name_with_type, value: item.code }))
                        .find((item) => item.value && item.value == selectedWard?.code) || undefined
                }
            />
        </div>
    );
}
