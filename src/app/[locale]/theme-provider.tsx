"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import theme from "@/theme";

export default function ThemeProviderClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}