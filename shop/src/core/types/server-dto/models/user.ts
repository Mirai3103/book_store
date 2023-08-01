import { DateOnly } from './dateOnly';
import { Role } from './role';
import { Permission } from './permission';
import { Token } from './token';

export enum Gender {
    MALE,
    FEMALE,
    UNKNOWN
}

export interface User {
    id: string;
    email: string;
    password: string;
    phoneNumber: string | null;
    avatarUrl: string | null;
    gender: Gender;
    birthday: DateOnly | null;
    isValidateEmail: boolean;
    isValidatePhoneNumber: boolean;
    displayName: string;
    roles: Role[];
    permissions: Permission[];
    tokens: Token[];
}