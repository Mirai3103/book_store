import { AiFillDashboard } from "react-icons/ai";
import { ISidebarGroup } from "../components/Sidebar";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiBookAlt, BiCategoryAlt } from "react-icons/bi";
const AppSidebarItems: ISidebarGroup[] = [
    {
        label: "Tổng quan",
        groupItems: [
            {
                Icon: AiFillDashboard,
                to: "/",
                label: "Trang chủ",
            },
            {
                Icon: BsGraphUpArrow,
                to: "/analytics",
                label: "Thống kê",
            },
        ],
    },
    {
        label: "Quản lý",
        groupItems: [
            {
                Icon: BiBookAlt,
                to: "/book",
                label: "Sách",
            },
            {
                Icon: BiCategoryAlt,
                to: "/category",
                label: "Danh mục",
            },
        ],
    },
];

export default AppSidebarItems;
