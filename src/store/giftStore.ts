import { create } from 'zustand'
import { Gift } from "../data/model/Gift";
import { PaginationStore } from './common';

type Store = {
    data: Gift[];
    setData: (data: Gift[]) => void;
} & PaginationStore

export const useGiftStore = create<Store>((set) => ({
    data: [],
    setData: (data: Gift[]) => set((_) => ({ data: data })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))