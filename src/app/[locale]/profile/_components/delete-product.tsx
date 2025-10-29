"use client";

import { startTransition, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProductResType } from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequests/product";
import { handleErrorApi } from "@/lib/utils";

export default function DeleteProduct({
  product,
}: {
  product: ProductResType;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const result = await productApiRequest.delete(product.id);
      toast.success(result.payload.message);
      setOpen(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        Xóa
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {"Xác nhận xóa sản phẩm?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Sản phẩm <strong>“{product.name}”</strong> sẽ bị xóa vĩnh viễn. Bạn
            có chắc chắn muốn tiếp tục không?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
