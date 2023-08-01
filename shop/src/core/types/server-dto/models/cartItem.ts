export interface CartItem {
    userId: string;
    bookId: number;
    quantity: number;
    user: User;
    book: Book;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    cartItems: CartItem[];
}

export interface Book {
    cartItems: CartItem[];
}