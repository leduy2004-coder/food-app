"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  userId: string;
};

export default function ProductAddButton({ userId }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(Boolean(localStorage.getItem("sessionToken")));
    }, 0);
  }, []);

  if (!isAuthenticated) return null;

  return (
    <Link href={`/profile/${userId}/product/add`} passHref>
      <Button variant="contained" color="primary">
        Thêm sản phẩm
      </Button>
    </Link>
  );
}
