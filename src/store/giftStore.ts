import { create } from 'zustand'
import { Gift } from "../data/model/Gift";

type Store = {
    gifts: Gift[];
    setGifts: (data: Gift[]) => void;
    currentPage: number;
    setCurrentPage: (value: number) => void;
    totalPage: number;
    setTotalPage: (value: number) => void;
}

export const useGiftStore = create<Store>((set) => ({
    gifts: [],
    setGifts: (data: Gift[]) => set((_) => ({ gifts: data })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))