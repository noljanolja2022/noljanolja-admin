export type ClientUser = {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
    phone?: string;
}

export type User = {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    email: boolean;
    createdAt: Date;
    updatedAt: Date;
}