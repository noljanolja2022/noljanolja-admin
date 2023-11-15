export interface Gift {
    id: string;
    giftNo: number;
    name: string;
    description: string;
    image: string;
    endTime: Date;
    brand: GiftBrand;
    price: number;
    retailPrice: number;
    isActive: boolean;
}

export interface GiftBrand {
    id: string,
    name: string,
    image: string
}