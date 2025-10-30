// components/simple-pagination.tsx

"use client";

import { Box, Pagination, Typography } from "@mui/material";

type SimplePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  size?: "small" | "medium" | "large";
};

export default function SimplePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  size = "medium",
}: SimplePaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={4}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => {
          onPageChange(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        color="primary"
        size={size}
        showFirstButton
        showLastButton
      />

      <Typography variant="body2" color="text.secondary">
        {startItem}-{endItem} / {totalItems}
      </Typography>
    </Box>
  );
}
