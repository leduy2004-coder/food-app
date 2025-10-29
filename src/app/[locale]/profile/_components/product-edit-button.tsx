"use client";

import { Button } from "@mui/material";
import { ProductResType } from "@/schemaValidations/product.schema";
import Link from "next/link";

type Props = {
  product: ProductResType;
  userId: string;
};

export default function ProductEditButton({ product, userId }: Props) {
  const isAuthenticated =
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("sessionToken"));

  if (!isAuthenticated) return null;

  return (
    <div className="flex space-x-2 items-start">
      <Link href={`/profile/${userId}/product/${product.id}/edit`}>
        <Button>Edit</Button>
      </Link>
    </div>
  );
}
