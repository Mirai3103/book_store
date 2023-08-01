import { Role } from './role';
import { User } from './user';

export interface Permission {
    id: number;
    value: string;
    displayName: string;
    roles: Role[];
    users: User[];
}