import { create } from 'zustand';
import { GiftBrand } from "../data/model/Gift";
import { PaginationStore } from './common';

type Store = {
    brands: GiftBrand[];
    setBrands: (data: GiftBrand[]) => void;
} & PaginationStore

export const useBrandStore = create<Store>((set, get) => ({
    brands: [],
    setBrands: (data: GiftBrand[]) => set((_) => ({ brands: data })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))