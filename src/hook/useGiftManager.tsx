import { Gift } from "../data/model/Gift";
import giftService from "../service/GiftService";
import { useLoadingStore } from "../store/LoadingStore";
import { useGiftStore } from "../store/giftStore";

export default function useGiftManager() {
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const { data, setData, totalPage, setTotalPage, currentPage, setCurrentPage } = useGiftStore();

    const fetchGifts = (query: string = '', isFeatured: boolean = false, isTodayOffer: boolean = false, isRecommended: boolean = false, page?: number) => {
        setLoading()
        console.log(query)
        console.log(isFeatured)
        giftService.getGifts(query, isFeatured, isTodayOffer, isRecommended, page || currentPage).then(res => {
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

    const deleteGift = (data: Gift) => {
        setLoading()
        giftService.deleteGift(data.id).then(res => {
            if (res.isFailure()) {
                showErrorNoti('Gift deleted failed');
                return;
            }
            showSuccessNoti('Gift deleted successfully');
            fetchGifts()
        }).finally(() => {
            setIdle();
        })
    }

    return {
        data, fetchGifts, deleteGift,
        totalPage, setTotalPage, currentPage, setCurrentPage,
    }
}