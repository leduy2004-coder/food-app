import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "vn"],
  defaultLocale: "en",
});

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];
const productEditRegex = /^\/products\/\d+\/edit$/;

export function middleware(request: NextRequest) {
  // Bước 1: chạy i18n middleware
  const intlResponse = intlMiddleware(request);

  // Nếu i18n cần redirect (ví dụ / -> /en), return sớm
  if (intlResponse.headers.get("x-middleware-next") === null) {
    return intlResponse;
  }

  // Bước 2: xử lý auth logic
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Chưa login -> chặn private routes
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đã login -> không cho vào login/register
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  // Chưa login mà muốn sửa sản phẩm
  if (pathname.match(productEditRegex) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu không có gì đặc biệt -> tiếp tục
  return intlResponse;
}

export const config = {
  matcher: [
    "/",
    "/(en|vn)/:path*",
    "/me",
    "/login",
    "/register",
    "/profile/:path*",
    "/products/:path*",
  ],
};
