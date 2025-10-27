"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { getTokenExpiry, handleErrorApi } from "@/lib/utils";
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
  Divider,
} from "@mui/material";

const LoginForm = () => {
  const t = useTranslations("LoginPage");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const router = useRouter();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.login(values);
      const token = result.payload.result.access_token;
      const refreshToken = result.payload.result.refresh_token;

      const expiresAt = getTokenExpiry(token);
      
      await authApiRequest.auth({
        sessionToken: token,
        expiresAt: expiresAt?.toString() || "",
      });

      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);

      const userObj = {
        nickName: result.payload.result.nickName,
        email: result.payload.result.email,
        id: result.payload.result.id,
        role: result.payload.result.roles[0].code,
      };

      toast.success(result.payload.message);
      setUser(userObj);

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

  function onSwitchToRegister(): void {
    router.push("/register");
  }

  return (
    <Paper
      elevation={4}
      sx={{
        p: 5,
        maxWidth: 420,
        width: "100%",
        mx: "auto",
        mt: 8,
        borderRadius: 4,
        backdropFilter: "blur(12px)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        align="center"
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #007bff, #00c6ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("title")}
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 3,
        }}
      >
        {/* username */}
        <TextField
          label={t("username")}
          type="text"
          variant="outlined"
          fullWidth
          {...form.register("username")}
          error={!!form.formState.errors.username}
          helperText={form.formState.errors.username?.message}
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

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 1,
            py: 1.3,
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 2,
            background: "linear-gradient(45deg, #007bff, #00c6ff)",
            "&:hover": {
              background: "linear-gradient(45deg, #0069d9, #00b4ff)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={26} color="inherit" />
          ) : (
            t("button")
          )}
        </Button>
      </Box>

      {/* Divider and Switch */}
      <Divider sx={{ my: 3 }}>Hoặc</Divider>

      <Typography align="center" variant="body2">
        {t("noAccount")}{" "}
        <Button
          variant="text"
          onClick={onSwitchToRegister}
          sx={{
            fontWeight: 600,
            color: "#007bff",
            textTransform: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {t("switchToRegister")}
        </Button>
      </Typography>
    </Paper>
  );
};

export default LoginForm;
