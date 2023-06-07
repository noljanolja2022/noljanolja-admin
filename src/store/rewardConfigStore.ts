import { create } from 'zustand'
import { ChatRewardConfig } from '../data/model/ConfigModels';

type RewardStore = {
    chatConfigs: ChatRewardConfig[];
    setChatConfigs: (data: ChatRewardConfig[]) => void;
}

export const useRewardStore = create<RewardStore>((set) => ({
    chatConfigs: [],
    setChatConfigs: (data: ChatRewardConfig[]) => set((_) => ({ chatConfigs: data })),
}))