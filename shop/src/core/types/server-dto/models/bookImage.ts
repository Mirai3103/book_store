import { Book } from './book';

export interface BookImage {
    id: number;
    bookId: number;
    book: Book | null;
    url: string;
}