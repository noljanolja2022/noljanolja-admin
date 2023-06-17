import giftService from "../service/GiftService";
import { useLoadingStore } from "../store/LoadingStore";
import { useGiftStore } from "../store/giftStore";
import { useCategoryStore } from "../store/categoryStore";
import { useBrandStore } from "../store/brandStore";
import { Gift } from "../data/model/Gift";

export default function useGiftManager() {
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const { gifts, setGifts, totalPage, setTotalPage, currentPage, setCurrentPage } = useGiftStore();
    const { setCategories, categories } = useCategoryStore();
    const { brands, setBrands } = useBrandStore();

    const fetchGifts = () => {
        setLoading()
        giftService.getGifts(currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setGifts(res.data || [])
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
        gifts, fetchGifts, deleteGift,
        totalPage, setTotalPage, currentPage, setCurrentPage,
        fetchCategories , categories,
    }
}