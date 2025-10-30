"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "../image";

export const Hero = () => {
  const t = useTranslations("HeroPage");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="relative bg-gradient-to-br from-purple-100 to-orange-100 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center min-h-[400px]">
            {/* Loading skeleton */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-purple-100 to-orange-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left side - Bread image */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="relative w-64 h-80">
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=400&fit=crop&crop=center"
                alt={t("altFreshBread")}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Center - Text content */}
          <div className="lg:col-span-1 text-center lg:text-left space-y-4">
            <p className="text-lg text-gray-700 font-medium">{t("tagline")}</p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              {t("titleLine1")}
              <br />
              <span className="text-red-600">{t("titleLine2")}</span>
            </h1>
            <div className="space-y-2 text-gray-600 text-lg">
              <p>{t("subtitle1")}</p>
              <p>{t("subtitle2")}</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              {t("ctaButton")}
            </button>
          </div>

          {/* Right side - Baked goods */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end space-y-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=120&fit=crop&crop=center",
                alt: t("baguettes"),
              },
              {
                src: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=200&h=120&fit=crop&crop=center",
                alt: t("roundBread"),
              },
              {
                src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=120&fit=crop&crop=center",
                alt: t("croissant"),
              },
            ].map((item, index) => (
              <div key={index} className="relative w-48 h-24">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
