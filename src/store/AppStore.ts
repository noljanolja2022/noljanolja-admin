import { create } from "zustand"
import { useUserStore } from "./UserStore"
import { useLoadingStore } from "./LoadingStore"

type AppStore = {

}

export const userAppStore = create<AppStore>((set) => ({
    ...useLoadingStore,
    ...useUserStore,
}))