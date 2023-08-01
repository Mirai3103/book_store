import { Book } from './book';

export interface Category {
    id: number;
    name: string;
    description: string | null;
    deletedAt: string | null;
    books: Book[];
    totalBooks: number;
}