import { User } from './user';

export interface Token {
    id: number;
    tokenValue: string;
    isRevoked: boolean;
    createdAt: string;
    userId: string;
    user: User;
    deviceInfo: string;
}