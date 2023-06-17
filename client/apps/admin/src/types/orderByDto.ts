export interface IOrderBy<T> {
  isAscending: boolean;
  orderBy: keyof T;
}
