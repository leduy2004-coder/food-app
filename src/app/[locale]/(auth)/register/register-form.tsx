"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";

const RegisterForm = () => {
  const t = useTranslations("RegisterPage");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      username: "",
      nickName: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      await authApiRequest.register(values);

      toast.success("Đăng ký thành công");

      router.push("/login");
    } catch (error: unknown) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 500,
        width: "100%",
        mx: "auto",
        mt: 6,
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom align="center">
        {t("title")}
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* username */}
        <TextField
          label={t("username")}
          variant="outlined"
          fullWidth
          {...form.register("username")}
          error={!!form.formState.errors.username}
          helperText={form.formState.errors.username?.message}
        />

        {/* Email */}
        <TextField
          label={t("email")}
          type="email"
          variant="outlined"
          fullWidth
          {...form.register("email")}
          error={!!form.formState.errors.email}
          helperText={form.formState.errors.email?.message}
        />

        {/* Password */}
        <TextField
          label={t("password")}
          type="password"
          variant="outlined"
          fullWidth
          {...form.register("password")}
          error={!!form.formState.errors.password}
          helperText={form.formState.errors.password?.message}
        />

        {/* Confirm Password */}
        <TextField
          label={t("confirmPassword")}
          type="password"
          variant="outlined"
          fullWidth
          {...form.register("confirmPassword")}
          error={!!form.formState.errors.confirmPassword}
          helperText={form.formState.errors.confirmPassword?.message}
        />
        {/* nickname */}
        <TextField
          label={t("nickName")}
          variant="outlined"
          fullWidth
          {...form.register("nickName")}
          error={!!form.formState.errors.nickName}
          helperText={form.formState.errors.nickName?.message}
        />
        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mt: 2, py: 1.5 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("button")
          )}
        </Button>

        {/* Switch to login */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, color: "text.secondary" }}
        >
          {t("haveAccount")}{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push("/login")}
            sx={{ cursor: "pointer", fontWeight: 500 }}
          >
            {t("login")}
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
