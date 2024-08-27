import { Metadata, ResolvingMetadata } from "next";
import { reformatLocationString } from "@/app/generalFunctions/reformatLocationString";
import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import { fetchPropertyPageData } from "@/app/generalFunctions/apiDataFetches/propertyRoute/fetchPropertyPageData";
import Header from "@/app/ui/headerAndFooter/header/header";
import HeaderSection from "@/app/ui/property/sections/headerSection";
import ImageCollageSection from "@/app/ui/property/sections/imageCollageSection";
import OverviewSection from "@/app/ui/property/sections/overviewSection";
import CategorizedImagesSection from "@/app/ui/property/sections/categorizedImagesSection";
import CancellationPolicySection from "@/app/ui/property/sections/cancellationPolicySection";
import TheNeighborhoodSection from "@/app/ui/property/sections/theNeighborhoodSection";
import ReviewsSection from "@/app/ui/property/sections/reviewsSection";
import AlsoViewedSection from "@/app/ui/property/sections/alsoViewedSection";
import FooterSeparatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/property/property-page.scss";

type MetadataProps = {
  params: { ["property-slug"]: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const property = params["property-slug"];

  const reformattedLocationString = reformatLocationString(property);

  return {
    title: `Modern Hostels: ${reformattedLocationString}`,
  };
}

export default async function Page({
  params,
}: {
  params: { ["property-slug"]: string };
}) {
  const isMobile = await isMobileDevice();
  const propertyPageSlug = params["property-slug"];

  const propertyPageData = await fetchPropertyPageData(propertyPageSlug);

  return (
    <section id="kst-property-page">
      <Header style="light-theme" isMobile={isMobile} />
      {propertyPageData ? (
        <>
          <HeaderSection {...propertyPageData.headerSection} />
          <ImageCollageSection {...propertyPageData.imageCollageSection} />
          <OverviewSection
            {...propertyPageData.overviewSection}
            isMobile={isMobile}
          />
          <CategorizedImagesSection
            {...propertyPageData.categorizedImagesSection}
          />
          <TheNeighborhoodSection
            {...propertyPageData.theNeighborhoodSection}
          />
          <ReviewsSection {...propertyPageData.reviewsSection} />
          <CancellationPolicySection
            {...propertyPageData.cancellationPolicySection}
          />
          <AlsoViewedSection {...propertyPageData.alsoViewedSection} />
        </>
      ) : (
        <></>
      )}
      <FooterSeparatorSection isMobile={isMobile} />
      <Footer />
    </section>
  );
}
