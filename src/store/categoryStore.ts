import { create } from 'zustand'
import { Gift, GiftCategory } from "../data/model/Gift";

type Store = {
    categories: GiftCategory[];
    setCategories: (data: GiftCategory[]) => void;
}

export const useCategoryStore = create<Store>((set) => ({
    categories: [],
    setCategories: (data: GiftCategory[]) => set((_) => ({ categories: data })),
}))