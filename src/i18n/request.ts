import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const LOCALES = ["en", "vn"];
const DEFAULT_LOCALE = "en";

export default getRequestConfig(async ({ locale }) => {
  const usedLocale = locale ?? DEFAULT_LOCALE;

  if (!LOCALES.includes(usedLocale)) notFound();

  try {
    const messages = (await import(`./messages/${usedLocale}.json`)).default;
    return { locale: usedLocale, messages };
  } catch {
    notFound();
  }
});
