export enum OrderStatus {
    Pending = 0,
    Shipping = 1,
    Delivered = 2,
    Cancelled = 3
}

export interface Order {
    createdAt: string;
    deletedAt: string | null;
    userId: string;
    id: string;
    user: User;
    total: number;
    shippingFee: number;
    addressId: number;
    address: Address;
    status: OrderStatus;
}

export interface User {
    orders: Order[];
}

export interface Address {
    orders: Order[];
}