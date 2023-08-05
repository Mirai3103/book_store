export interface CreateRoleDto {
    value: string;
    displayName: string;
}

export interface UpdateRoleDto extends CreateRoleDto {
    removedPermissionIds: number[];
    addedPermissionIds: number[];
}