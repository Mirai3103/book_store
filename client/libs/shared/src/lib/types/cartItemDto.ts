import { BookPreviewDto } from './bookPreviewDto';

export interface AddToCartDto {
    bookId: number;
    quantity: number;
}

export interface CartItemDto {
    userId: string;
    bookId: number;
    quantity: number;
    book: BookPreviewDto;
    createdAt: string;
    updatedAt: string;
}