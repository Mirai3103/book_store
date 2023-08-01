import { FormFile } from './formFile';
import { BookAttribute } from './bookAttribute';
import { FormFileCollection } from './formFileCollection';

export interface CreateBookDto {
    title: string;
    name: string;
    authorId: number;
    providerId: number;
    publisherId: number;
    thumbnail: FormFile;
    price: number;
    publishDate: string | null;
    language: string | null;
    description: string | null;
    seriesId: number | null;
    episode: string | null;
    stock: number | null;
    categoryId: number;
    bookAttributes: BookAttribute[];
    images: FormFileCollection;
}