import { create } from 'zustand'
import { User } from '../data/model/UserModels';

type UserStore = {
    user: User | null;
    setUser: (newUser: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (newUser: User | null) => set((state) => ({ user: newUser })),
}))