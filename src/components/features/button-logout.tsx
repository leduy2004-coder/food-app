"use client";

import authApiRequest from "@/apiRequests/auth";
import { useAppContext } from "@/app/[locale]/app-provider";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ButtonLogout() {
  const t = useTranslations("Header");

  const { setUser } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
      authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    } finally {
      setUser(null);
      router.refresh();
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
      setLoading(false);
      toast.success("Đăng xuất thành công");
    }
  };

  return (
    <Button
      variant="outlined"
      size="small"
      color="error"
      onClick={handleLogout}
      disabled={loading}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        fontWeight: 500,
      }}
    >
      {loading ? <CircularProgress size={18} color="inherit" /> : t("logout")}
    </Button>
  );
}
