import { camelCaseToPascalCase } from '@/lib/Utils';
import api from '../api';
import {
  CreateSeriesDto,
  SeriesDto,
  UpdateSeriesDto,
} from '@/lib/types/seriesDto';

class SeriesApiService {
  async createSeries(createSeriesDto: CreateSeriesDto): Promise<SeriesDto> {
    const res = await api.post('Series', createSeriesDto);
    return res.data;
  }
  async getAllSeries(
    page: number,
    limit: number,
    search = '',
    orderBy = 'id',
    isAscending = true
  ) {
    const response = await api.get(
      `Series?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
        orderBy
      )}&isAscending=${isAscending}`
    );
    return response.data;
  }
  public async getSeriesById(id: number | string): Promise<SeriesDto> {
    const res = await api.get(`Series/${id}`);
    return res.data;
  }
  public async updateSeries(
    id: number,
    updateSeriesDto: UpdateSeriesDto
  ): Promise<SeriesDto> {
    const res = await api.put(`Series/${id}`, updateSeriesDto);
    return res.data;
  }

  public async deleteSeries(id: number): Promise<void> {
    const res = await api.delete(`Series/${id}`);
    return res.data;
  }
}

export default new SeriesApiService();
