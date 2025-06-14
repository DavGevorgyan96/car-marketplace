"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const safePage = (page: number): number => {
    return Number.isFinite(page) && page > 0 ? page : 1;
  };

  const handlePageChange = (page: number) => {
    router.push(`?${createQueryString("page", safePage(page).toString())}`);
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const range = 2;

    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center mt-8 gap-2 select-none"
    >
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition
          hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        &lt;
      </button>

      {currentPage - 2 > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-blue-600 hover:text-white transition
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            1
          </button>
          <span className="flex items-center px-2 text-gray-500 select-none">
            …
          </span>
        </>
      )}

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`w-10 h-10 rounded-md border shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500
            ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
        >
          {page}
        </button>
      ))}

      {currentPage + 2 < totalPages && (
        <>
          <span className="flex items-center px-2 text-gray-500 select-none">
            …
          </span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-blue-600 hover:text-white transition
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition
          hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        &gt;
      </button>
    </nav>
  );
};
