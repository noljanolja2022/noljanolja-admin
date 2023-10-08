import { Gift } from "../data/model/Gift";
import giftService from "../service/GiftService";
import { useLoadingStore } from "../store/LoadingStore";
import { useCategoryStore } from "../store/categoryStore";
import { useGiftStore } from "../store/giftStore";

export default function useGiftManager() {
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const { data, setData, totalPage, setTotalPage, currentPage, setCurrentPage } = useGiftStore();
    const { setCategories, categories } = useCategoryStore();

    const fetchGifts = () => {
        setLoading()
        giftService.getGifts(currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setData(res.data || [])
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

    const fetchCategories = () => {
        giftService.getCategories().then(setCategories)
    }

    return {
        data, fetchGifts, deleteGift,
        totalPage, setTotalPage, currentPage, setCurrentPage,
        fetchCategories , categories,
    }
}