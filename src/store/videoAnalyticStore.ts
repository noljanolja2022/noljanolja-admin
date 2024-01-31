import { PaginationStore } from "./common";
import { create } from "zustand"
import { VideoAnalytic } from "../data/model/VideoModels"

type Store = {
    videoAnalytics: VideoAnalytic[];
    setVideoAnalytics: (value: VideoAnalytic[]) => void;
} & PaginationStore

export const useVideoAnalyticStore = create<Store>((set) => ({
    videoAnalytics: [],
    setVideoAnalytics: (value: VideoAnalytic[]) => set(_ => ({ videoAnalytics: value })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))