import { BookAttribute } from "./bookAttribute";

export interface CreateBookDto {
    title: string;
    name: string;
    authorId: number;
    providerId: number;
    publisherId: number;
    thumbnail: FileList;
    price: number;
    publishDate: string | null;
    language: string | null;
    description: string | null;
    seriesId: number | null;
    episode: string | null;
    stock: number | null;
    categoryId: number;
    bookAttributes: BookAttribute[];
    images: FileList;
}
