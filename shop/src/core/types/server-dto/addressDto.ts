import { UserDto } from "./userDto";

export interface AddressDto {
    id: number;
    userId: string;
    province: string;
    district: string;
    ward: string;
    phoneNumber: string;
    receiverName: string;
    particularAddress: string;
    isPrimary: boolean;
    user?: UserDto;
}
