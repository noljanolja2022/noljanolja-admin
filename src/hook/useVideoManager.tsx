import { VideoRewardConfigProgress } from "../data/model/ConfigModels";
import mediaService from "../service/MediaService";
import { useLoadingStore } from "../store/LoadingStore";
import { useVideoStore } from "../store/videoStore";

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

    const fetch = (query: string = '') => {
        setLoading()
        mediaService.getVideoList(query, currentPage).then(res => {
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
        fetch, setCurrentPage, setTotalPage
    }
}