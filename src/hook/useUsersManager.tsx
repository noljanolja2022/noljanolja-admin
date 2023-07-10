import { getTotalPages } from "../data/model/Result";
import userService from "../service/UserService";
import { useLoadingStore } from "../store/LoadingStore";
import { useUserStore } from "../store/UserStore";

export default function useUsersManager() {
    const { setLoading, setIdle } = useLoadingStore();
    const { users, setUsers, currentPage, totalPage, setCurrentPage, setTotalPage } = useUserStore();

    const fetch = (query: string = '') => {
        setLoading()
        userService.getUsers(query, currentPage).then(res => {
            if (res.isFailure()) {
                return;
            }
            setUsers(res.data || [])
            if (res.pagination) {
                setTotalPage(getTotalPages(res.pagination!))
            }
        }).finally(() => {
            setIdle();
        })
    }

    return {
        fetch, users, currentPage, totalPage, setCurrentPage
    }
}