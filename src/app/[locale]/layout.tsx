import * as React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import theme from "@/theme";
import ModeSwitch from "@/components/features/ModeSwitch";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "../globals.css";

// import Header from "@/components/app.header";
// import SlideSession from "@/components/slide-session";
// import AppProvider from "./app-provider";
import { baseOpenGraph } from "@/app/[locale]/shared-metadata";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Productic",
    default: "Productic",
  },
  description: "Được tạo bởi Được dev",
  openGraph: baseOpenGraph,
};

const LOCALES = ["en", "vn"];
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Handle MUI color scheme preference */}
        <InitColorSchemeScript attribute="class" />
      </head>
      <body className={`${inter.className}`}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ModeSwitch />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
