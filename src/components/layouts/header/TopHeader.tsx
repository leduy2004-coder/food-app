"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import { useAppContext as UserAuth } from "@/app/[locale]/app-provider";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import ModeSwitch from "@/components/features/mode-switch";
import authApiRequest from "@/apiRequests/auth";
import { toast } from "sonner";

const TopHeader = ({ locale }: { locale: string }) => {
  const t = useTranslations("Header");
  const { user, setUser } = UserAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Chuyển ngôn ngữ
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    const target = path ? `/${newLocale}/${path}` : `/${newLocale}`;
    router.replace(target);
    router.refresh();
  };

  async function handleLogout(): Promise<void> {
    await authApiRequest.logoutFromNextClientToNextServer();
    localStorage.clear();
    setUser(null);
    router.push("/login");
    toast.success(t("Đăng xuất thành công"));
  }

  return (
    <div className="bg-[rgb(206,196,43)] px-4 py-2 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-sm hover:text-gray-200">
            {t("aboutUs")}
          </a>
          <a href="#" className="text-sm hover:text-gray-200">
            {t("support")}
          </a>
        </div>

        {/* Center - Message */}
        <div className="text-sm">{t("downloadApp")}</div>

        {/* Right side - User Menu */}
        <div ref={menuRef} className="relative">
          <div className="flex items-center space-x-2">
            {user && (
              <span className="text-sm font-medium text-white">
                {user.nickName}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 relative">
            {/* User Menu */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                {user && <span>{user.nickName}</span>}
                <svg
                  className={`h-4 w-4 transition-transform ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl animate-fadeIn">
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t("profile")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t("logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t("login")}
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t("register")}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Language switch */}
            <div className="relative">
              <select
                value={locale}
                onChange={handleLanguageChange}
                className="appearance-none cursor-pointer rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="en" className="text-black">
                  EN
                </option>
                <option value="vn" className="text-black">
                  VN
                </option>
              </select>
            </div>

            <div className="ml-2">
              <ModeSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
