import { CategoryDto } from '@/libs/types/categoryDto';
import api from '../api';
import { camelCaseToPascalCase } from '@/libs/Utils';

class CategoryApiService {
  async getAllCategories(
    page: number,
    limit: number,
    search = '',
    orderBy = 'id',
    isAscending = true
  ) {
    const response = await api.get(
      `Category?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
        orderBy
      )}&isAscending=${isAscending}`
    );
    return response.data;
  }
  async deleteCategory(id: number) {
    const response = await api.delete(`Category/${id}`);
    return response.data;
  }
  async getCategoryById(id: number) {
    const response = await api.get(`Category/${id}`);
    return response.data;
  }
  async createCategory(createCategoryDto: Omit<CategoryDto, 'id'>) {
    const response = await api.post('Category', createCategoryDto);
    return response.data;
  }
  async updateCategory(id: number, updateCategoryDto: CategoryDto) {
    const response = await api.put(`Category/${id}`, updateCategoryDto);
    return response.data;
  }
}
export default new CategoryApiService();
