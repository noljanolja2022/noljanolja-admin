import { getTotalPages } from "../data/model/Result";
import giftService from "../service/GiftService";
import { useLoadingStore } from "../store/LoadingStore";
import { useBrandStore } from "../store/brandStore";

export default function useBrandManager() {
    const { setLoading, setIdle } = useLoadingStore();
    const { brands, setBrands, currentPage, totalPage, setCurrentPage,setTotalPage } = useBrandStore();

    const fetchBrands = (query: string = '', locale: string = 'KR') => {
        setLoading()
        giftService.fetchBrands(query, locale, currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setBrands(res.data || [])
            if (res.pagination) {
                setTotalPage(getTotalPages(res.pagination!))
            }
        }).finally(() => {
            setIdle();
        })
    }

    return {
        fetchBrands, brands, currentPage, totalPage, setCurrentPage,
    }
}