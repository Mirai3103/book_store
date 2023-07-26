import { AuthorDto } from "@appTypes/server-dto/authorDto";
import axios from "axios";
import { camelCaseToPascalCase } from "@/utils";
import { PaginationDto } from "../types/server-dto/paginationDto";
export default class AuthorApiService {
    static async getAllAuthors(page: number, limit: number, search = "", orderBy = "id", isAscending = true) {
        const response = await axios.get<PaginationDto<AuthorDto>>(
            `Author?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
                orderBy
            )}&isAscending=${isAscending}`
        );
        return response.data;
    }
    static async deleteAuthor(id: number) {
        const response = await axios.delete(`Author/${id}`);
        return response.data;
    }
    static async getAuthorById(id: number) {
        const response = await axios.get(`Author/${id}`);
        return response.data;
    }
    static async createAuthor(createAuthorDto: Omit<AuthorDto, "id">) {
        const response = await axios.post("Author", createAuthorDto);
        return response.data;
    }
    static async updateAuthor(id: number, updateAuthorDto: AuthorDto) {
        const response = await axios.put(`Author/${id}`, updateAuthorDto);
        return response.data;
    }
}
