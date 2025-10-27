"use client";

import { useEffect, useState } from "react";
import { Skeleton, Box } from "@mui/material";
import CardCategory from "./card-category";
import categoryApiRequest from "@/apiRequests/category";
import { CategoryItemType } from "@/schemaValidations/category.schema";

const Category = () => {
  const [categories, setCategories] = useState<CategoryItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await categoryApiRequest.getAllCategoriesAPI();
        if (response) {
          setCategories(response.payload.result);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Box key={i}>
                <Skeleton
                  variant="rectangular"
                  height={160}
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton width="60%" sx={{ mt: 1 }} />
              </Box>
            ))
          : categories.map((item) => (
              <Box key={item.id}>
                <CardCategory item={item} />
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default Category;
