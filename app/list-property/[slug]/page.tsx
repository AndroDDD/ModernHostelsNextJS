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
  params: Promise<{ ["slug"]: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export async function generateMetadata(props: MetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const location = params["slug"];

  const reformattedLocationString = reformatLocationString(location);

  return {
    title: `List With Modern Hostels: ${reformattedLocationString}`,
  };
}

export default async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const isMobile = await isMobileDevice();
  const slug = params.slug;
  const csrfToken = (await headers()).get("X-CSRF-Token") || "no_token";

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
