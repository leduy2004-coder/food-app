import * as React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import theme from "@/theme";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";

import { baseOpenGraph } from "@/app/[locale]/shared-metadata";
import AppProvider from "./app-provider";
import { HeaderLayout } from "@/layouts/header";

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

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    notFound(); // fallback nếu locale không tồn tại
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>

        <InitColorSchemeScript attribute="class" />
      </head>
      <body className={inter.className}>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AppProvider>
              <HeaderLayout locale={locale} />
              {props.children}
            </AppProvider>
          </MuiThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
