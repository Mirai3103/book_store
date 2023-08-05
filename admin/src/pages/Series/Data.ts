import { SeriesDto } from '@/types/seriesDto';

export const THeadText: {
  key: keyof SeriesDto;
  label: string;
  withOrder?: boolean;
}[] = [
  {
    key: 'id',
    label: 'Mã',
    withOrder: true,
  },
  {
    key: 'name',
    label: 'Tên bộ sách',
    withOrder: true,
  },
  {
    key: 'totalBooks',
    label: 'Tổng sách',
    withOrder: true,
  },
  {
    key: 'lastedBook',
    label: 'Sách mới nhất',
    withOrder: false,
  },
  {
    key: 'updatedAt',
    label: 'Cập nhật lúc',
    withOrder: true,
  },
  {
    key: 'author',
    label: 'Tác giả',
    withOrder: false,
  },
  {
    key: 'publisher',
    label: 'Nhà xuất bản',
    withOrder: false,
  },
];
