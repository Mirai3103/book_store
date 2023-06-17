import { AuthorDto } from '@/types/authorDto';

export const THeadText: {
  key: keyof AuthorDto;
  label: string;
  withOrder?: boolean;
}[] = [
  {
    key: 'id',
    label: 'Mã danh mục',
    withOrder: true,
  },
  {
    key: 'name',
    label: 'Tên danh mục',
    withOrder: true,
  },
  {
    key: 'description',
    label: 'Giới thiệu',
    withOrder: false,
  },
  {
    key: 'totalBooks',
    label: 'Tổng số sách',
    withOrder: true,
  },
];
