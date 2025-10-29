"use client";

import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import createCategoryAPI from "@/apiRequests/category";
import { CategoryCreateType } from "@/schemaValidations/category.schema";
import { toast } from "sonner";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warning("Vui lòng nhập tên danh mục!");
      return;
    }

    const request: CategoryCreateType = { name };
    setLoading(true);

    try {
      await createCategoryAPI.createCategoryAPI(request, file || undefined);
      toast.success("Tạo danh mục thành công!");
      router.push("/admin/category");
      router.refresh();
    } catch (err) {
      console.error("Create category error:", err);
      toast.error("Lỗi khi tạo danh mục!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Box className="flex justify-center mt-10">
      <Card
        sx={{ maxWidth: 500, width: "100%", boxShadow: 3, borderRadius: 3 }}
      >
        <CardHeader title="Thêm danh mục mới" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Tên danh mục */}
              <TextField
                label="Tên danh mục"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />

              {/* Upload ảnh */}
              <div>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Ảnh danh mục (tùy chọn)
                </Typography>
                <Button variant="outlined" component="label">
                  Chọn ảnh
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {file && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Đã chọn: <strong>{file.name}</strong>
                  </Typography>
                )}
              </div>

              {/* Buttons */}
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress color="inherit" size={18} />
                    ) : null
                  }
                >
                  {loading ? "Đang lưu..." : "Lưu"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
