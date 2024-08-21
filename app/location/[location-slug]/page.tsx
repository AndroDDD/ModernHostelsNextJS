import { Metadata, ResolvingMetadata } from "next";
import { reformatLocationString } from "@/app/generalFunctions/reformatLocationString";
import { fetchPropertyLocationPageData } from "@/app/generalFunctions/apiDataFetches/propertyLocationRoute/fetchPropertyLocationPageData";
import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import Header from "@/app/ui/headerAndFooter/header/header";
import IntroSection from "@/app/ui/propertyLocation/sections/introSection";
import PropertiesSection from "@/app/ui/propertyLocation/sections/propertiesSection";
import MapSection from "@/app/ui/propertyLocation/sections/mapSection";
import SlideSection from "@/app/ui/propertyLocation/sections/slideSection";
import OtherLocationsSection from "@/app/ui/propertyLocation/sections/otherLocationsSection";
import FAQSection from "@/app/ui/propertyLocation/sections/faqSection";
import FooterSeparatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/property-location/property-location-page.scss";

type MetadataProps = {
  params: { ["location-slug"]: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const location = params["location-slug"];

  const reformattedLocationString = reformatLocationString(location);

  return {
    title: `Modern Hostels: ${reformattedLocationString}`,
  };
}
export default async function Page({
  params,
}: {
  params: { ["location-slug"]: string };
}) {
  const isMobile = await isMobileDevice();
  const location = params["location-slug"];
  const pageData = await fetchPropertyLocationPageData(location);

  console.log({ pageData });

  return (
    <section id="kst-property-location-page">
      <Header isMobile={isMobile} />
      {pageData ? (
        <>
          <IntroSection
            key={`kst-location-intro-section`}
            {...pageData.introSection}
          />
          <PropertiesSection
            key={`kst-location-properties-section`}
            {...pageData.propertiesSection}
          />
          <MapSection
            key={`kst-location-map-section`}
            {...pageData.mapSection}
          />
          <SlideSection
            key={`kst-location-slide-section`}
            {...pageData.slideSection}
          />
          <OtherLocationsSection
            key={`kst-location-other-locations-section`}
            {...pageData.otherLocationsSection}
          />
          <FAQSection
            key={`kst-location-faqs-section`}
            {...pageData.faqSection}
          />
        </>
      ) : (
        <></>
      )}
      <FooterSeparatorSection isMobile={isMobile} />
      <Footer />
    </section>
  );
}
