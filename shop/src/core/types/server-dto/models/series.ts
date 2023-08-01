import { Author } from './author';
import { Publisher } from './publisher';
import { Book } from './book';

export interface Series {
    id: number;
    name: string;
    slug: string;
    authorId: number | null;
    author: Author;
    publisherId: number | null;
    publisher: Publisher;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    books: Book[];
}