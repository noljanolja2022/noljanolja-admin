import giftService from "../service/GiftService";
import { useLoadingStore } from "../store/LoadingStore";
import { useBrandStore } from "../store/brandStore";

export default function useBrandManager() {
    const { setLoading, setIdle } = useLoadingStore();
    const { brands, setBrands, currentPage, totalPage, setCurrentPage } = useBrandStore();

    const fetchBrands = () => {
        setLoading()
        giftService.fetchBrands(currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setBrands(res.data || [])
        }).finally(() => {
            setIdle();
        })
    }

    return {
        fetchBrands, brands, currentPage, totalPage, setCurrentPage
    }
}