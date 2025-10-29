"use client"
import Category from "@/components/category";
import { Hero } from "@/components/hero";
import {useAppContext} from "@/app/[locale]/app-provider"
import Link from "next/link";
import routes from "@/constants/routes";
const HomePage = () => {
  const { user } = useAppContext();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}

      <Hero />

      {/* Featured Categories */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Loại</h2>
        <div className="mb-4 text-gray-600">
          {user?.roles[0].code === "ADMIN" && (
            <button className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-red-700">
              <Link href={routes.admin_category}>Quản lý loại</Link>
            </button>
          )}
        </div>

        <Category />
      </section>

      {/* Promotions */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="rounded-2xl border border-gray-200 bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  Special Offer
                </h3>
                <p className="mb-4 text-gray-600">
                  Up to 30% off selected items
                </p>
                <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-red-700">
                  Shop Deals
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
