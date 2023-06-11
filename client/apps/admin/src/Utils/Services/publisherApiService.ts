import { PublisherDto } from '@/types/publisherDto';
import api from '../api';
class PublisherApiService {
  async getAllPublishers(page: number, limit: number, search = '') {
    const response = await api.get(
      `Publisher?page=${page}&limit=${limit}&search=${search}`
    );
    return response.data;
  }
  async deletePublisher(id: number) {
    const response = await api.delete(`Publisher/${id}`);
    return response.data;
  }
  async getPublisherById(id: number) {
    const response = await api.get(`Publisher/${id}`);
    return response.data;
  }
  async createPublisher(createPublisherDto: Omit<PublisherDto, 'id'>) {
    const response = await api.post('Publisher', createPublisherDto);
    return response.data;
  }
  async updatePublisher(id: number | string, updatePublisherDto: PublisherDto) {
    const response = await api.put(`Publisher/${id}`, updatePublisherDto);
    return response.data;
  }
}

export default new PublisherApiService();
