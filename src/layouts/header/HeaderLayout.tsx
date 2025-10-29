import TopHeader from "./TopHeader";
import MainNavbar from "./MainNavbar";

const HeaderLayout = ({ locale }: { locale: string }) => {
  return (
    <header className="relative" suppressHydrationWarning>
      <TopHeader locale={locale} />
      <MainNavbar />
    </header>
  );
};

export default HeaderLayout;
