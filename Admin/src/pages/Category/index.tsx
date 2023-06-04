import React from "react";
import { CategoryDto } from "@/types/categoryDto";
import { PaginationDto } from "@/types/paginationDto";
import api from "@/Utils/api";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
export default function CategoryManagementIndexPage() {
    const [categories, setCategories] = React.useState<PaginationDto<CategoryDto>>();
    const { currentPage, onChangePage, setTotalPages, totalPages } = usePagination();
    React.useEffect(() => {
        api.get("/Category?page=1&limit=10").then((res) => {
            setCategories(res.data);
            setTotalPages(res.data.totalPages);
        });
    }, []);

    return (
        <div>
            <div className=" h-full">
                <table className="table table-lg">
                    <thead>
                        <tr className="font-medium text-xl">
                            <th>Mã danh mục</th>
                            <th>Tên danh mục</th>
                            <th>Giới thiệu</th>
                            <th>Tổng số sách</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.items.map((category) => (
                            <tr className="hover" key={category.id}>
                                <td>{category.id}</td>
                                <td className="font-semibold">{category.name}</td>
                                <td className="truncate">{category.description}</td>
                                <td>{category.totalBooks}</td>
                                <td>
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <label tabIndex={0} className="m-1 font-bold btn btn-sm">
                                            <BsThreeDots />
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="p-2 gap-y-1 shadow z-10 menu menu-md dropdown-content bg-base-100 rounded-box w-52"
                                        >
                                            <li>
                                                <a className="bg-warning text-warning-content">
                                                    <AiFillEdit />
                                                    Sửa thông tin
                                                </a>
                                            </li>
                                            <li>
                                                <a className="bg-error text-error-content">
                                                    <AiFillDelete />
                                                    Xoá danh mục
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={5} className="text-center">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPage={totalPages}
                                    onPageChange={onChangePage}
                                />
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
