import { Permission } from './permission';
import { User } from './user';

export interface Role {
    id: number;
    value: string;
    displayName: string;
    permissions: Permission[];
    users: User[];
}