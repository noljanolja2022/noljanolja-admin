export interface Gift {
    id: string;
    giftNo: number;
    name: string;
    description: string;
    image: string;
    endTime: Date;
    brand: GiftBrand;
    category: Nullable<GiftCategory>;
    price: number;
    retailPrice: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    isFeatured: boolean;
    isTodayOffer: boolean;
}

export interface GiftBrand {
    id: string,
    name: string,
    image: string
}

export interface GiftCategory {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}