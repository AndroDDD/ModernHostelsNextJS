import { isMobileDevice } from "../generalFunctions/isMobile";
import Header from "@/app/ui/headerAndFooter/header/header";
import CoreSection from "../ui/map/sections/coreSection";
import FooterSeparatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/map/map-page.scss";

export default async (
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const isMobile = await isMobileDevice();
  const market = searchParams ? (searchParams["market"] as string) : undefined;

  return (
    <main id="kst-map-page">
      <Header style="light-theme" isMobile={isMobile} />
      <CoreSection marketName={market} />
      <FooterSeparatorSection style="cream-theme" isMobile={isMobile} />
      <Footer style="light-theme" />
    </main>
  );
};
