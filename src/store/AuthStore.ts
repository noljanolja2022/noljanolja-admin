import { create } from 'zustand'

type AuthStore = {
    bearer: Nullable<string>;
    setBearer: (value: Nullable<string>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    bearer: null,
    setBearer: (value: Nullable<string>) => set(_ => ({ bearer: value })),
}))