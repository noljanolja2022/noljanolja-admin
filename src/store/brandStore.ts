import { create } from 'zustand'
import { Gift, GiftBrand } from "../data/model/Gift";

type Store = {
    brands: GiftBrand[];
    setBrands: (data: GiftBrand[]) => void;
    currentPage: number;
    setCurrentPage: (value: number) => void;
    totalPage: number;
    setTotalPage: (value: number) => void;
}

export const useBrandStore = create<Store>((set) => ({
    brands: [],
    setBrands: (data: GiftBrand[]) => set((_) => ({ brands: data })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))