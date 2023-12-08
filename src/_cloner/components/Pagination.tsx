import React from "react";
import ReactPaginate from "react-paginate";
interface PaginationProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            pageCount={Math.ceil(pageCount)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={onPageChange}
            nextLabel="صفحه بعدی"
            previousLabel="صفحه قبلی"
            containerClassName="flex items-center justify-center my-4 "
            pageClassName="inline-block text-center flex items-center justify-center mx-2 rounded-full !w-7 !h-7"
            pageLinkClassName="text-[#fcc615] !text-[#272862] hover:text-blue-800 px-3 py-2 rounded-full"
            activeClassName="bg-[#fcc615] !text-[#272862]"
            disabledClassName="opacity-50"
        />
    );
};

export default Pagination;
