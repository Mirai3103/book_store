export interface UserDto {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string | null;
    phoneNumber: string | null;
    gender: Gender | null;
    birthday: Date | null;
    isValidateEmail: boolean;
}

export interface UpdateUserDto {
    id: string;
    email: string | null;
    displayName: string | null;
    avatarUrl: string | null;
    phoneNumber: string | null;
    gender: Gender | null;
    birthday: Date | null;
}
export enum Gender {
    MALE,
    FEMALE,
    UNKNOWN,
}
