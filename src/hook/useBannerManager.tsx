import bannerService from "../service/BannerService";
import { useLoadingStore } from "../store/LoadingStore";
import { userBannerStore } from "../store/bannerStore";

export default function useBannerManager() {
    const { setLoading, setIdle } = useLoadingStore();
    const { data, setData, currentPage, totalPage, setCurrentPage } = userBannerStore();

    const fetch = () => {
        setLoading()
        bannerService.getBanners(currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setData(res.data || [])
        }).finally(() => {
            setIdle();
        })
    }

    return {
        fetch, data, currentPage, totalPage, setCurrentPage
    }
}