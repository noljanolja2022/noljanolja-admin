import { create } from "zustand"
import { useUserStore } from "./UserStore"
import { useLoadingStore } from "./LoadingStore"
import { useRewardStore } from "./rewardConfigStore"
import { useVideoStore } from "./videoStore"

type AppStore = {

}

export const userAppStore = create<AppStore>((set) => ({
    ...useLoadingStore,
    ...useUserStore,
    ...useRewardStore,
    ...useVideoStore
}))