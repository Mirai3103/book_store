import { BookDto } from "@/core/types/server-dto/bookDto";
import { mergeClassNames } from "@/utils";
import React from "react";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    book: BookDto;
}
export default function ProductDetail({ book, className = "", ...props }: IProps) {
    return (
        <div className={className}>
            <div className="border shadow">
                <h3 className="typography-headline-4 py-2 mb-5 bg-primary-500 text-primary-25 px-4">
                    Thông tin chi tiết
                </h3>

                <div className={mergeClassNames("relative overflow-x-auto  sm:rounded-lg", className)}>
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <tbody>
                            <tr className="border-b border-gray-200 ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                >
                                    Danh mục
                                </th>
                                <td className="px-6 py-4"> {book.category?.name}</td>
                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                >
                                    Tác giả
                                </th>
                                <td className="px-6 py-4"> {book.author?.name}</td>
                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                >
                                    Nhà xuất bản
                                </th>
                                <td className="px-6 py-4"> {book.publisher?.name}</td>
                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                >
                                    Nhà cung cấp
                                </th>
                                <td className="px-6 py-4"> {book.provider?.name}</td>
                            </tr>
                            <tr className="border-b border-gray-200 ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                >
                                    Ngày xuất bản
                                </th>
                                <td className="px-6 py-4"> {book.publishDate}</td>
                            </tr>
                            {book.series && (
                                <tr className="border-b border-gray-200 ">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                    >
                                        Bộ sách
                                    </th>
                                    <td className="px-6 py-4"> {book.series.id}</td>
                                </tr>
                            )}
                            {book.episode && (
                                <tr className="border-b border-gray-200 ">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                    >
                                        Tập
                                    </th>
                                    <td className="px-6 py-4"> {book.episode}</td>
                                </tr>
                            )}
                            <tr className="border-b border-gray-200 ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                >
                                    Ngôn ngữ
                                </th>
                                <td className="px-6 py-4"> {book.language}</td>
                            </tr>
                            {book.bookAttributes.map(({ attributeName, attributeValue }) => (
                                <tr className="border-b border-gray-200 " key={attributeName}>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                    >
                                        {attributeName}
                                    </th>
                                    <td className="px-6 py-4">{attributeValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3 className="typography-headline-5 my-5 font-medium  px-4">Mô tả</h3>
                    <article
                        dangerouslySetInnerHTML={{
                            __html:
                                book?.description
                                    ?.split("\n")
                                    .map((paragraph) => `<p>${paragraph}</p>`)
                                    .join("") || "",
                        }}
                        className="w-full px-8 mb-6 prose-sm"
                    ></article>
                </div>
            </div>
        </div>
    );
}
