export interface UpdateUserPermissionDto {
    addedPermissionIds: number[];
    removedPermissionIds: number[];
    userId: string;
}