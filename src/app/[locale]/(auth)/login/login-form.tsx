"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
import { useAppContext } from "@/app/[locale]/app-provider";
import { toast } from "sonner";
import { useTranslations } from "next-intl";


import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const LoginForm = () => {
  const t = useTranslations("LoginPage");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const router = useRouter();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.login(values);

      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt,
      });

      toast.success(result.payload.message);

      setUser(result.payload.data.account);
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error("Đăng nhập thất bại");
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
        {t("button")}
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
        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          {...form.register("email")}
          error={!!form.formState.errors.email}
          helperText={form.formState.errors.email?.message}
        />

        {/* Password Field */}
        <TextField
          label={t("password")}
          type="password"
          variant="outlined"
          fullWidth
          {...form.register("password")}
          error={!!form.formState.errors.password}
          helperText={form.formState.errors.password?.message}
        />

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
      </Box>
    </Paper>
  );
};

export default LoginForm;
