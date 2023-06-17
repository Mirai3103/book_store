import { BookPreviewDto } from './bookPreviewDto';
import { AuthorDto } from './authorDto';
import { PublisherDto } from './publisherDto';

export interface SeriesDto {
  id: number;
  name: string;
  description: string | null;
  totalBooks: number;
  lastedBook: BookPreviewDto | null;
  updatedAt: string;
  slug: string;
  authorId: number;
  author: AuthorDto | null;
  publisherId: number;
  publisher: PublisherDto | null;
}

export type CreateSeriesDto = Omit<
  SeriesDto,
  | 'id'
  | 'totalBooks'
  | 'lastedBook'
  | 'updatedAt'
  | 'slug'
  | 'author'
  | 'publisher'
>;
export type UpdateSeriesDto = Omit<
  SeriesDto,
  'totalBooks' | 'lastedBook' | 'updatedAt' | 'slug' | 'author' | 'publisher'
>;
