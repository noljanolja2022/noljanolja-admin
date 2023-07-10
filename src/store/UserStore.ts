import { create } from 'zustand'
import { User } from '../data/model/UserModels';
import { PaginationStore } from './common';

type UserStore = {
    user: User | null;
    setUser: (newUser: User | null) => void;
    users: User[];
    setUsers: (users: User[]) => void;
} & PaginationStore

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (newUser: User | null) => set((_) => ({ user: newUser })),
    users: [],
    setUsers: (data: User[]) => set((_) => ({ users: data })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))