import { useLoadingStore } from "../store/LoadingStore";
import mediaService from "../service/MediaService";
import { useVideoAnalyticStore } from "../store/videoAnalyticStore";

export default function useVideoAnalyticManager() {
    const { videoAnalytics, setVideoAnalytics, currentPage, setCurrentPage, setTotalPage, totalPage } = useVideoAnalyticStore();
    const { setLoading, setIdle} = useLoadingStore();

    const fetch = () => {
        setLoading()
        mediaService.getVideoAnalytics(currentPage).then(res => {
            setVideoAnalytics(res.data || [])
            if (res.pagination) {
                setTotalPage(Math.ceil(res.pagination?.total / res.pagination?.pageSize))
            } else {
                setCurrentPage(1)
                setTotalPage(0)
            }
        }).finally(() => {
            setIdle()
        })
    }

    return {
        videoAnalytics, totalPage, currentPage,
        fetch, setCurrentPage, setTotalPage
    }
}