import { create } from 'zustand';
import { GiftCategory } from "../data/model/Gift";
import { PaginationStore } from './common';

type Store = {
    categories: GiftCategory[];
    setCategories: (data: GiftCategory[]) => void;
} & PaginationStore

export const useGiftCategoryStore = create<Store>((set, get) => ({
    categories: [],
    setCategories: (data: GiftCategory[]) => set((_) => ({ categories: data })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))