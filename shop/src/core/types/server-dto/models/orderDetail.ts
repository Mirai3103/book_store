import { Book } from './book';

export interface OrderDetail {
    quantity: number;
    price: number;
    orderId: string;
    order: Order;
    bookId: number;
    book: Book;
}

export interface Order {
    orderDetails: OrderDetail[];
}