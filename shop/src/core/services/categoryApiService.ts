import { CategoryDto } from "@appTypes/server-dto/categoryDto";
import axios from "axios";
import { camelCaseToPascalCase } from "@/utils";

class CategoryApiService {
    static async getAllCategories(page: number, limit: number, search = "", orderBy = "id", isAscending = true) {
        const response = await axios.get(
            `Category?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
                orderBy
            )}&isAscending=${isAscending}`
        );
        return response.data;
    }
    async deleteCategory(id: number) {
        const response = await axios.delete(`Category/${id}`);
        return response.data;
    }
    static async getCategoryById(id: number) {
        const response = await axios.get(`Category/${id}`);
        return response.data;
    }
    static async createCategory(createCategoryDto: Omit<CategoryDto, "id">) {
        const response = await axios.post("Category", createCategoryDto);
        return response.data;
    }
    static async updateCategory(id: number, updateCategoryDto: CategoryDto) {
        const response = await axios.put(`Category/${id}`, updateCategoryDto);
        return response.data;
    }
}
export default CategoryApiService;
