import { Book } from './book';

export interface Publisher {
    id: number;
    name: string;
    description: string;
    deletedAt: string | null;
    books: Book[];
}