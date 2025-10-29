import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
        ← Trước
      </button>

      <span className="text-gray-700">
        Trang <strong>{page}</strong> / {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
        Sau →
      </button>
    </div>
  );
};

export default Pagination;