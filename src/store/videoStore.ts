import { create } from "zustand";
import { Video } from "../data/model/VideoModels";

type Store = {
    videos: Video[];
    setVideos: (value: Video[]) => void;
    currentPage: number;
    setCurrentPage: (value: number) => void;
    totalPage: number;
    setTotalPage: (value: number) => void;
}

export const useVideoStore = create<Store>((set) => ({
    videos: [],
    setVideos: (value: Video[]) => set(_ => ({ videos: value })),
    currentPage: 1,
    setCurrentPage: (value: number) => set(_ => ({ currentPage: value })),
    totalPage: 1,
    setTotalPage: (value: number) => set(_ => ({ totalPage: value })),
}))