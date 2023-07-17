import { DateOnly } from './dateOnly';
import { Gender } from './gender';

export interface UserDto {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string | null;
    phoneNumber: string | null;
    gender: string | null;
    birthday: DateOnly | null;
    isValidateEmail: boolean;
}

export interface UpdateUserDto {
    id: string;
    email: string | null;
    displayName: string | null;
    avatarUrl: string | null;
    phoneNumber: string | null;
    gender: Gender | null;
    birthday: DateOnly | null;
}