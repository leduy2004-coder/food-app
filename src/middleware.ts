import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "vn"],
  defaultLocale: "en",
});

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];
const adminPaths = ["/admin"];
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
  const userRole = request.cookies.get("userRole")?.value;

  // Loại bỏ locale prefix để kiểm tra path
  const pathWithoutLocale = pathname.replace(/^\/(en|vn)/, "") || "/";

  // Chặn admin routes: chỉ cho phép role = "admin" hoặc "ADMIN"
  const isAdminPath = adminPaths.some((path) =>
    pathWithoutLocale.startsWith(path)
  );

  if (isAdminPath) {
    if (!sessionToken) {
      // Chưa login -> redirect về login
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userRole !== "admin" && userRole !== "ADMIN") {
      // Đã login nhưng không phải admin -> redirect về 403
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // Chưa login -> chặn private routes
  if (
    privatePaths.some((path) => pathWithoutLocale.startsWith(path)) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đã login -> không cho vào login/register
  if (
    authPaths.some((path) => pathWithoutLocale.startsWith(path)) &&
    sessionToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Chưa login mà muốn sửa sản phẩm
  if (pathWithoutLocale.match(productEditRegex) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu không có gì đặc biệt -> tiếp tục
  return intlResponse;
}

export const config = {
  matcher: [
    "/",
    "/(en|vn)/:path*",
    "/login",
    "/register",
    "/profile/:path*",
    "/products/:path*",
    "/admin/:path*",
  ],
};
