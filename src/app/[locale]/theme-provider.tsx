"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import theme from "@/theme";
import EmotionCacheProvider from "./emotion-cache";

export default function ThemeProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <EmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  );
}
