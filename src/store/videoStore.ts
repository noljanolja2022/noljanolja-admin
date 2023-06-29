import { create } from "zustand";
import { Video } from "../data/model/VideoModels";
import { PaginationStore } from "./common";

type Store = {
    videos: Video[];
    setVideos: (value: Video[]) => void;
} & PaginationStore

export const useVideoStore = create<Store>((set) => ({
    videos: [],
    setVideos: (value: Video[]) => set(_ => ({ videos: value })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))