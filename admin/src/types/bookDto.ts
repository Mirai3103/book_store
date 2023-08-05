import { AuthorDto } from './authorDto';
import { ProviderDto } from './providerDto';
import { PublisherDto } from './publisherDto';
import { SeriesDto } from './seriesDto';
import { CategoryDto } from './categoryDto';
import { BookAttribute } from './bookAttribute';
import { BookImage } from './bookImage';

export interface BookDto {
    id: number;
    title: string;
    name: string;
    slug: string;
    authorId: number;
    author: AuthorDto | null;
    providerId: number;
    provider: ProviderDto | null;
    publisherId: number;
    publisher: PublisherDto | null;
    thumbnailUrl: string;
    price: number;
    publishDate: string | null;
    language: string | null;
    description: string | null;
    seriesId: number | null;
    series: SeriesDto | null;
    episode: string | null;
    stock: number;
    categoryId: number;
    category: CategoryDto | null;
    createdAt: string;
    bookAttributes: BookAttribute[];
    bookImages: BookImage[];
}