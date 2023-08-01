import { BookAttribute } from './bookAttribute';
import { FormFileCollection } from './formFileCollection';

export interface UpdateBookDto {
    title: string;
    name: string;
    authorId: number;
    providerId: number;
    publisherId: number;
    price: number;
    publishDate: string | null;
    language: string | null;
    description: string | null;
    seriesId: number | null;
    episode: string | null;
    stock: number | null;
    categoryId: number;
    bookAttributes: BookAttribute[];
    deleteBookAttributes: string[];
}

export interface UpdateBookImageDto {
    images: FormFileCollection | null;
    deleteImages: string[];
}