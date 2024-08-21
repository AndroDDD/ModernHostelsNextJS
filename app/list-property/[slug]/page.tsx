import { Metadata, ResolvingMetadata } from "next";

import { emailServerUrl } from "@/app/constants/wpApiUrl";
import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import { fetchListPropertyPageData } from "@/app/generalFunctions/apiDataFetches/listPropertyRoute/fetchListPropertyPageData";
import Header from "@/app/ui/headerAndFooter/header/header";
import CoreSection from "@/app/ui/listProperty/sections/coreSection";
import FooterSeparatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/list-property/list-property-page.scss";
import { reformatLocationString } from "@/app/generalFunctions/reformatLocationString";
import { headers } from "next/headers";

type MetadataProps = {
  params: { ["slug"]: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const location = params["slug"];

  const reformattedLocationString = reformatLocationString(location);

  return {
    title: `List With Modern Hostels: ${reformattedLocationString}`,
  };
}

export default async ({ params }: { params: { slug: string } }) => {
  const isMobile = await isMobileDevice();
  const slug = params.slug;
  const csrfToken = headers().get("X-CSRF-Token") || "no_token";

  const pageData = await fetchListPropertyPageData(slug);
  console.log({ emailServerUrl, csrfToken });

  return (
    <section id="kst-list-property-page">
      <Header isMobile={isMobile} />
      <CoreSection
        key={`kst-list-property-core-section-${slug}`}
        {...pageData}
        emailServer={emailServerUrl}
        csrfToken={csrfToken}
      />
      <FooterSeparatorSection isMobile={isMobile} />
      <Footer />
    </section>
  );
};
