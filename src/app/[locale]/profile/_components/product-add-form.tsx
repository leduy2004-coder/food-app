"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  CircularProgress,
  MenuItem,
  Paper,
} from "@mui/material";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
} from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequests/product";
import categoryApiRequest from "@/apiRequests/category";

import { CategoryItemType } from "@/schemaValidations/category.schema";
import { useAppContext as UserAuth } from "@/app/[locale]/app-provider";
import Image from "@/components/image";

type Props = {
  product?: ProductResType;
};

const ProductAddForm = ({ product }: Props) => {
  const router = useRouter();
  const { user } = UserAuth();
  const isEdit = !!product?.id;
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(product?.imgUrl[0]?.url ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryItemType[]>([]);
  console.log(product);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      description: product?.description ?? "",
      categoryId: product?.categoryId ?? "",
    },
  });

  // Fetch categories khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categoryApiRequest.getAllCategoriesAPI();
        setCategories(result.payload.result || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Không thể tải danh sách danh mục");
      }
    };

    fetchCategories();
  }, []);

  // Reset form khi product thay đổi
  useEffect(() => {
    console.log(product);
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description ?? "",
        categoryId: product.categoryId ?? "",
      });
      setPreview(product.imgUrl[0]?.url ?? "");
      setFile(null);
    }
  }, [product, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onSubmit = async (values: CreateProductBodyType) => {
    if (loading) return;

    if (!values.name || !values.price) {
      toast.warning("Vui lòng nhập tên và giá sản phẩm!");
      return;
    }

    // Validate image cho create
    if (!isEdit && !file) {
      toast.error("Vui lòng chọn hình ảnh!");
      return;
    }

    try {
      setLoading(true);

      if (isEdit && product) {
        // Update product content
        await productApiRequest.updateContent({
          id: product.id,
          name: values.name,
          price: values.price,
          description: values.description,
          categoryId: values.categoryId,
        });

        // Update image nếu có file mới
        if (file) {
          await productApiRequest.updateImage({ productId: product.id }, [
            file,
          ]);
        }

        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        // Create new product
        await productApiRequest.create(values, [file as File]);

        toast.success("Thêm sản phẩm thành công!");
      }

      router.push(`/profile/${user?.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        isEdit ? "Không thể cập nhật sản phẩm." : "Không thể tạo sản phẩm."
      );
    } finally {
      setLoading(false);
    }
  };
  console.log("testtttt");
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tên sản phẩm"
                  placeholder="Nhập tên sản phẩm"
                  fullWidth
                  disabled={loading}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mô tả"
                  placeholder="Nhập mô tả sản phẩm"
                  fullWidth
                  multiline
                  rows={4}
                  disabled={loading}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Giá (VNĐ)"
                  placeholder="Nhập giá sản phẩm"
                  fullWidth
                  disabled={loading}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                />
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Danh mục"
                  fullWidth
                  disabled={loading}
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                >
                  <MenuItem value="">
                    <em>Chọn danh mục</em>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Hình ảnh {!isEdit && <span style={{ color: "red" }}>*</span>}
              </Typography>
              <Button variant="outlined" component="label" disabled={loading}>
                Chọn file
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {!isEdit && !file && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  Vui lòng chọn hình ảnh
                </Typography>
              )}
            </Box>

            {preview && (
              <Stack spacing={1}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 240,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Image src={preview} fill alt="Preview" loading="eager" />
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  disabled={loading}
                  onClick={handleRemoveImage}
                  sx={{ width: "fit-content" }}
                >
                  Xóa hình ảnh
                </Button>
              </Stack>
            )}

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={loading}
                fullWidth
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                {loading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductAddForm;
