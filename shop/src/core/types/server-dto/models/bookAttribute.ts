import { Book } from './book';

export interface BookAttribute {
    bookId: number;
    book: Book | null;
    attributeName: string;
    attributeValue: string;
}