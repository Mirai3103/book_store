import { AiFillDashboard, AiOutlineUser } from 'react-icons/ai';
import { ISidebarGroup } from '../components/Sidebar';
import { BsGraphUpArrow } from 'react-icons/bs';
import { BiBookAlt, BiCategoryAlt } from 'react-icons/bi';
import { MdOutlinePublic } from 'react-icons/md';
import { GiFactory } from 'react-icons/gi';
const AppSidebarItems: ISidebarGroup[] = [
  {
    label: 'Tổng quan',
    groupItems: [
      {
        Icon: AiFillDashboard,
        to: '/',
        label: 'Trang chủ',
      },
      {
        Icon: BsGraphUpArrow,
        to: '/analytics',
        label: 'Thống kê',
      },
    ],
  },
  {
    label: 'Quản lý',
    groupItems: [
      {
        Icon: BiBookAlt,
        to: '/book',
        label: 'Sách',
      },
      {
        Icon: BiCategoryAlt,
        to: '/category',
        label: 'Danh mục',
      },
      {
        Icon: AiOutlineUser,
        to: '/author',
        label: 'Tác giả',
      },
      {
        Icon: MdOutlinePublic,
        to: '/publisher',
        label: 'Nhà xuất bản',
      },
      {
        Icon: GiFactory,
        to: '/provider',
        label: 'Nhà cung cấp',
      },
    ],
  },
];

export default AppSidebarItems;
