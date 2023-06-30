export interface OrderByDto<T> {
  orderBy: keyof T;
  isAscending: boolean;
}
