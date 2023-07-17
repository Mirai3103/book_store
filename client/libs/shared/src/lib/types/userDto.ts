export enum Gender {
  MALE,
  FEMALE,
  UNKNOWN,
}
export interface UserDto {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  phoneNumber: string | null;
  gender: string | null;
  birthday: string | null;
  isValidateEmail: boolean;
}

export interface UpdateUserDto {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  phoneNumber: string | null;
  gender: Gender | null | string;
  birthday: string | null;
}
