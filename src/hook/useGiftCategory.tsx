import { getTotalPages } from "../data/model/Result";
import giftService from "../service/GiftService";
import { useLoadingStore } from "../store/LoadingStore";
import { useGiftCategoryStore } from "../store/categoryStore";

export default function useGiftCategoryManager() {
    const { setLoading, setIdle } = useLoadingStore();
    const { categories, setCategories, currentPage, totalPage, setCurrentPage,setTotalPage } = useGiftCategoryStore();

    const fetch = (query: string = '') => {
        setLoading()
        giftService.fetchCategories(query, currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setCategories(res.data || [])
            if (res.pagination) {
                setTotalPage(getTotalPages(res.pagination!))
            }
        }).finally(() => {
            setIdle();
        })
    }

    return {
         fetch, categories, currentPage, totalPage, setCurrentPage,
    }
}