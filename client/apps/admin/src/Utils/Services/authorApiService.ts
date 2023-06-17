import { AuthorDto } from '@/types/authorDto';
import api from '../api';
import { camelCaseToPascalCase } from '@client/libs/shared/src/lib/Utils';
class AuthorApiService {
  async getAllAuthors(
    page: number,
    limit: number,
    search = '',
    orderBy = 'id',
    isAscending = true
  ) {
    const response = await api.get(
      `Author?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
        orderBy
      )}&isAscending=${isAscending}`
    );
    return response.data;
  }
  async deleteAuthor(id: number) {
    const response = await api.delete(`Author/${id}`);
    return response.data;
  }
  async getAuthorById(id: number) {
    const response = await api.get(`Author/${id}`);
    return response.data;
  }
  async createAuthor(createAuthorDto: Omit<AuthorDto, 'id'>) {
    const response = await api.post('Author', createAuthorDto);
    return response.data;
  }
  async updateAuthor(id: number, updateAuthorDto: AuthorDto) {
    const response = await api.put(`Author/${id}`, updateAuthorDto);
    return response.data;
  }
}
export default new AuthorApiService();
