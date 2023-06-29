export type PaginationStore = {
    currentPage: number;
    setCurrentPage: (value: number) => void;
    totalPage: number;
    setTotalPage: (value: number) => void;
}