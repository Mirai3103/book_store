import { Author } from './author';
import { Provider } from './provider';
import { Publisher } from './publisher';
import { Series } from './series';
import { Category } from './category';
import { BookAttribute } from './bookAttribute';
import { BookImage } from './bookImage';

export interface Book {
    id: number;
    title: string;
    name: string;
    slug: string;
    authorId: number;
    author: Author | null;
    providerId: number;
    provider: Provider | null;
    publisherId: number;
    publisher: Publisher | null;
    thumbnailUrl: string;
    price: number;
    publishDate: string | null;
    language: string | null;
    description: string | null;
    seriesId: number | null;
    series: Series | null;
    episode: string | null;
    stock: number;
    categoryId: number;
    category: Category | null;
    createdAt: string;
    deletedAt: string | null;
    bookAttributes: BookAttribute[];
    bookImages: BookImage[];
}