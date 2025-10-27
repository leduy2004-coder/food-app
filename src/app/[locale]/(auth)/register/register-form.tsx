"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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

  // ✅ Type-safe form
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      username: "",
      nickName: "",
      password: "",
      status: true,
      roles: [
        {
          code: "USER",
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<RegisterBodyType> = async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      await authApiRequest.register(values);

      toast.success("Đăng ký thành công");
      router.push("/login");
    } catch (error: unknown) {
      handleErrorApi({ error, setError: form.setError });
      toast.error("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

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
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label={t("username")}
          fullWidth
          {...form.register("username")}
          error={!!form.formState.errors.username}
          helperText={form.formState.errors.username?.message}
        />

        <TextField
          label={t("email")}
          type="email"
          fullWidth
          {...form.register("email")}
          error={!!form.formState.errors.email}
          helperText={form.formState.errors.email?.message}
        />

        <TextField
          label={t("password")}
          type="password"
          fullWidth
          {...form.register("password")}
          error={!!form.formState.errors.password}
          helperText={form.formState.errors.password?.message}
        />

        <TextField
          label={t("nickName")}
          fullWidth
          {...form.register("nickName")}
          error={!!form.formState.errors.nickName}
          helperText={form.formState.errors.nickName?.message}
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
