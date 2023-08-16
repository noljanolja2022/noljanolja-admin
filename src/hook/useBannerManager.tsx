import { Banner } from "../data/model/BannerModels";
import bannerService from "../service/BannerService";
import { useLoadingStore } from "../store/LoadingStore";
import { userBannerStore } from "../store/bannerStore";

export default function useBannerManager() {
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const { data, setData, currentPage, totalPage, setCurrentPage, setTotalPage } = userBannerStore();

    const fetch = (query: string = '') => {
        setLoading()
        bannerService.getBanners(query, currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setData(res.data || [])
            if (res.pagination) {
                setTotalPage(Math.ceil(res.pagination?.total / res.pagination?.pageSize))
            } else {
                setCurrentPage(1)
                setTotalPage(0)
            }
        }).finally(() => {
            setIdle();
        })
    }

    const deleteBanner = (item: Banner) => {
        setLoading()
        bannerService.deleteBanner(item.id).then(res => {
            if (res.isFailure()) {
                showErrorNoti(`Deleted failed. ${res.getErrorMsg()}`)
                return;
            }
            showSuccessNoti('Deleted successfully')
            fetch();
        }).finally(() => {
            setIdle();
        })
    }

    return {
        fetch, data, currentPage, totalPage, setCurrentPage, deleteBanner
    }
}