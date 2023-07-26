import { AdvancedSearchDto } from "../types/server-dto/advancedSearchDto";
import axios from "axios";
import { QueryParamsBuilder } from "@/utils";
import { camelCaseToPascalCase } from "@/utils";
import { UpdateBookDto } from "../types/server-dto/updateBookDto";
import { BasicSearchDto } from "../types/server-dto/basicSearchDto";
import { PaginationDto } from "../types/server-dto/paginationDto";
import { BookPreviewDto } from "../types/server-dto/bookPreviewDto";
import { BookDto } from "../types/server-dto/bookDto";

export default class BookApiService {
    static async updateBook(id: string, data: UpdateBookDto) {
        return await axios.put(`Book/${id}`, data);
    }
    public static async getAllBooks(
        {
            authorId,
            categoryId,
            keyword,
            maxPrice,
            minPrice,
            providerId,
            publisherId,
            seriesId,
            sortBy = "createdAt",

            isAsc = true,
        }: BasicSearchDto,
        page: number = 1,
        limit: number = 10
    ) {
        const queryParams = new QueryParamsBuilder()
            .addParam("authorId", authorId)
            .addParam("categoryId", categoryId)
            .addParam("keyword", keyword)
            .addParam("maxPrice", maxPrice)
            .addParam("minPrice", minPrice)
            .addParam("providerId", providerId)
            .addParam("publisherId", publisherId)
            .addParam("seriesId", seriesId)
            .addParam("sortBy", camelCaseToPascalCase(sortBy))
            .addParam("isAsc", isAsc + "")
            .addParam("page", page)
            .addParam("limit", limit)
            .build();
        const response = await axios.get<PaginationDto<BookPreviewDto>>(`Book/search?${queryParams}`);
        return response.data;
    }
    static async advancedSearch(
        {
            authorIds,
            categoryIds,
            keyword,
            maxPrice,
            minPrice,
            providerIds,
            publisherIds,
            seriesIds,
            sortBy = "createdAt",

            isAsc = true,
        }: AdvancedSearchDto,
        page: number,
        limit: number
    ) {
        const queryParams = new QueryParamsBuilder()
            .addParams("authorId", authorIds)
            .addParams("categoryId", categoryIds)
            .addParam("keyword", keyword)
            .addParam("maxPrice", maxPrice)
            .addParam("minPrice", minPrice)
            .addParams("providerId", providerIds)
            .addParams("publisherId", publisherIds)
            .addParams("seriesId", seriesIds)
            .addParam("sortBy", camelCaseToPascalCase(sortBy))
            .addParam("isAsc", isAsc + "")
            .addParam("page", page)
            .addParam("limit", limit)
            .build();
        const response = await axios.get(`Book/search?${queryParams}`);
        return response.data;
    }
    static async createBook(data: FormData) {
        const response = await axios.post("Book", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    static async getBookDetail(id: string | undefined) {
        if (!id) return null;
        const response = await axios.get<BookDto>(`Book/${id}`);
        return response.data;
    }
    static async updateBookCover(id: string, image: File) {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.patch(`Book/UpdateBookCover/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    static async updateBookImages(id: string, images: File[], deleteImages: string[]) {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append("images", image);
        });
        deleteImages.forEach((image) => {
            formData.append("deleteImages", image);
        });
        const response = await axios.patch(`Book/UpdateBookImages/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    public static async deleteBook(id: string) {
        const response = await axios.delete(`Book/${id}`);
        return response.data;
    }
}
