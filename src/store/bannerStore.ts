import { create } from 'zustand'
import { Banner } from '../data/model/BannerModels';
import { PaginationStore } from './common';

type Store = {
    data: Banner[];
    setData: (data: Banner[]) => void;
} & PaginationStore

export const userBannerStore = create<Store>((set) => ({
    data: [],
    setData: (data: Banner[]) => set((_) => ({ data: data })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))