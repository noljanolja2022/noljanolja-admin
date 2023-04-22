export interface StickerPack {
    id: number;
    name: string;
    publisher: string;
    trayImageFile: string;
    isAnimated: boolean;
    stickers: Sticker[];
}

export interface Sticker {
    imageFile: string,
    emojis: string[]
}
