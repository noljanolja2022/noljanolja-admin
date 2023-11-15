import { Gift } from "../data/model/Gift";
import giftService from "../service/GiftService";
import { useLoadingStore } from "../store/LoadingStore";
import { useGiftStore } from "../store/giftStore";

export default function useGiftManager() {
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const { data, setData, totalPage, setTotalPage, currentPage, setCurrentPage } = useGiftStore();

    const fetchGifts = (page?: number) => {
        setLoading()
        giftService.getGifts(page || currentPage).then(res => {
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