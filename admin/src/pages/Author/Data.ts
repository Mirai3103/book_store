import { AuthorDto } from '@/types/authorDto';

export const THeadText: {
  key: keyof AuthorDto;
  label: string;
  withOrder?: boolean;
}[] = [
  {
    key: 'id',
    label: 'Mã tác giả',
    withOrder: true,
  },
  {
    key: 'name',
    label: 'Tên tác giả',
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
