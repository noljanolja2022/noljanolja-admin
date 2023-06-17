export interface Gift {
    id: number;
    name: string;
    codes: string[];
    description: string;
    image: string;
    startTime: Date;
    endTime: Date;
    category: GiftCategory;
    brand: GiftBrand;
    total: number;
    remaining: number;
    price: number;
}

export interface GiftCategory {
    id: number,
    code: string,
    image: string
}

export interface GiftBrand {
    id: number,
    name: string,
    image: string
}