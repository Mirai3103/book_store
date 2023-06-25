import { AdvancedSearchDto } from '@/types/advancedSearchDto';
import api from '../api';
import { QueryParamsBuilder } from '..';
import { camelCaseToPascalCase } from '@client/libs/shared/src/lib/Utils';
import { UpdateBookDto } from '@/types/updateBookDto';

class BookApiService {
  async updateBook(id: string, data: UpdateBookDto) {
    return await api.put(`Book/${id}`, data);
  }
  public async getAllBooks(
    {
      authorId,
      categoryId,
      keyword,
      maxPrice,
      minPrice,
      providerId,
      publisherId,
      sortBy = 'id',
      isAsc = true,
    }: AdvancedSearchDto,
    page: number,
    limit: number
  ) {
    const queryParams = new QueryParamsBuilder()
      .addParam('authorId', authorId)
      .addParam('categoryId', categoryId)
      .addParam('keyword', keyword)
      .addParam('maxPrice', maxPrice)
      .addParam('minPrice', minPrice)
      .addParam('providerId', providerId)
      .addParam('publisherId', publisherId)
      .addParam('sortBy', camelCaseToPascalCase(sortBy))
      .addParam('isAsc', isAsc + '')
      .addParam('page', page)
      .addParam('limit', limit)
      .build();
    const response = await api.get(`Book/search?${queryParams}`);
    return response.data;
  }

  async createBook(data: FormData) {
    const response = await api.post('Book', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  async getBookDetail(id: string | undefined) {
    if (!id) return null;
    const response = await api.get(`Book/${id}`);
    return response.data;
  }
  async updateBookCover(id: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    const response = await api.patch(`Book/UpdateBookCover/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  async updateBookImages(id: string, images: File[], deleteImages: string[]) {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    deleteImages.forEach((image) => {
      formData.append('deleteImages', image);
    });
    const response = await api.patch(`Book/UpdateBookImages/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  public async deleteBook(id: string) {
    const response = await api.delete(`Book/${id}`);
    return response.data;
  }
}

export default new BookApiService();
