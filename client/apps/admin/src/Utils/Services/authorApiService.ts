import { AuthorDto } from "@/types/authorDto";
import axios from "axios";

class AuthorApiService {
    async getAllCategories(page: number, limit: number, search = "") {
        const response = await axios.get(`/api/Author?page=${page}&limit=${limit}&search=${search}`);
        return response.data;
    }
    async deleteAuthor(id: number) {
        const response = await axios.delete(`/api/Author/${id}`);
        return response.data;
    }
    async getAuthorById(id: number) {
        const response = await axios.get(`/api/Author/${id}`);
        return response.data;
    }
    async createAuthor(createAuthorDto: Omit<AuthorDto, "id">) {
        const response = await axios.post("/api/Author", createAuthorDto);
        return response.data;
    }
    async updateAuthor(id: number, updateAuthorDto: AuthorDto) {
        const response = await axios.put(`/api/Author/${id}`, updateAuthorDto);
        return response.data;
    }
}
export default new AuthorApiService();
