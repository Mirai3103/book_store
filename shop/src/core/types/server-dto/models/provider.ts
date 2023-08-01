import { Book } from './book';

export interface Provider {
    id: number;
    name: string;
    description: string | null;
    deletedAt: string | null;
    books: Book[];
}