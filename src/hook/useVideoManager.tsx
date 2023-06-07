import { useEffect, useState } from "react"
import { useVideoStore } from "../store/videoStore";
import { useLoadingStore } from "../store/LoadingStore";
import mediaService from "../service/MediaService";
import { Video } from "../data/model/VideoModels";
import rewardService from "../service/RewardService";
import { VideoRewardConfig, VideoRewardConfigProgress } from "../data/model/ConfigModels";

export type VideoSettingCardProps = {
    videoId: string;
    isActive?: boolean;
    maxApplyTimes?: number;
    totalPoints?: number;
    rewardProgresses?: VideoRewardConfigProgress[]
}

export default function useVideoManager() {
    const { videos, setVideos, currentPage, setCurrentPage, setTotalPage, totalPage } = useVideoStore();
    const { setLoading, setIdle } = useLoadingStore();

    const loadVideos = () => {
        setLoading()
        mediaService.getVideoList(currentPage).then(res => {
            setVideos(res.data || [])
            if (res.pagination) {
                setTotalPage(Math.ceil(res.pagination?.total / res.pagination?.pageSize))
            } else {
                setCurrentPage(1)
                setTotalPage(0)
            }
        }).finally(() => {
            setIdle()
        });
    }

    return {
        videos, totalPage, currentPage,
        loadVideos, setCurrentPage, setTotalPage
    }
}