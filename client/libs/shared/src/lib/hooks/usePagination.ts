import React from "react";

export default function usePagination() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const toNextPage = React.useCallback(() => {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    }, [totalPages]);
    const toPrevPage = React.useCallback(() => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    }, []);
    const onChangePage = React.useCallback((page: number) => {
        setCurrentPage(page);
    }, []);
    const setTotal = React.useCallback((total: number) => {
        setTotalPages((prev) => {
            if (prev !== total) {
                setCurrentPage(1);
                return total;
            }
            return prev;
        });
    }, []);

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages: setTotal,
        toNextPage,
        toPrevPage,
        onChangePage,
    };
}
