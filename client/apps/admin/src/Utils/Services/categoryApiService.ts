import { CategoryDto } from "@/types/categoryDto";
import axios from "axios";

class CategoryApiService {
    async getAllCategories(page: number, limit: number, search = "") {
        const response = await axios.get(`/api/Category?page=${page}&limit=${limit}&search=${search}`);
        return response.data;
    }
    async deleteCategory(id: number) {
        const response = await axios.delete(`/api/Category/${id}`);
        return response.data;
    }
    async getCategoryById(id: number) {
        const response = await axios.get(`/api/Category/${id}`);
        return response.data;
    }
    async createCategory(createCategoryDto: Omit<CategoryDto, "id">) {
        const response = await axios.post("/api/Category", createCategoryDto);
        return response.data;
    }
    async updateCategory(id: number, updateCategoryDto: CategoryDto) {
        const response = await axios.put(`/api/Category/${id}`, updateCategoryDto);
        return response.data;
    }
}
export default new CategoryApiService();
