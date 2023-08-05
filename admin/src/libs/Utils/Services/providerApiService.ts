import { ProviderDto } from '@/libs/types/providerDto';
import api from '../api';
import { camelCaseToPascalCase } from '@/libs/Utils';
class ProviderApiService {
  async getAllProviders(
    page: number,
    limit: number,
    search = '',
    orderBy = 'id',
    isAscending = true
  ) {
    const response = await api.get(
      `Provider?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
        orderBy
      )}&isAscending=${isAscending}`
    );
    return response.data;
  }
  async deleteProvider(id: number) {
    const response = await api.delete(`Provider/${id}`);
    return response.data;
  }
  async getProviderById(id: number) {
    const response = await api.get(`Provider/${id}`);
    return response.data;
  }
  async createProvider(createProviderDto: Omit<ProviderDto, 'id'>) {
    const response = await api.post('Provider', createProviderDto);
    return response.data;
  }
  async updateProvider(id: number | string, updateProviderDto: ProviderDto) {
    const response = await api.put(`Provider/${id}`, updateProviderDto);
    return response.data;
  }
}

export default new ProviderApiService();
