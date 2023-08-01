export interface Address {
    id: number;
    userId: string;
    province: string;
    district: string;
    ward: string;
    phoneNumber: string;
    receiverName: string;
    particularAddress: string;
    isPrimary: boolean;
    user: User;
    deletedAt: string | null;
}

export interface User {
    addresses: Address[];
}