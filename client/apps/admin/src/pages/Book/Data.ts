import { BookPreviewDto } from '@/types/bookPreviewDto';

export const THeadText: {
  key: keyof BookPreviewDto;
  label: string;
  withOrder?: boolean;
}[] = [
  {
    key: 'id',
    label: 'Mã',
    withOrder: true,
  },
  {
    key: 'title',
    label: 'Tên bộ sách',
    withOrder: true,
  },
  {
    key: 'author',
    label: 'Tác giả',
    withOrder: false,
  },
  {
    key: 'price',
    label: 'Giá',
    withOrder: true,
  },
  {
    key: 'createdAt',
    label: 'Ngày tạo',
    withOrder: true,
  },
];
