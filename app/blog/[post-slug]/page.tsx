import { Metadata, ResolvingMetadata } from "next";

import { fetchPostPageData } from "@/app/generalFunctions/apiDataFetches/blogRoute/fetchPostPageData";
import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import { reformatLocationString } from "@/app/generalFunctions/reformatLocationString";
import Header from "@/app/ui/headerAndFooter/header/header";
import HeaderSection from "@/app/ui/blog/[post-slug]/sections/headerSection";
import MainSection from "@/app/ui/blog/[post-slug]/sections/mainSection";
import FooterSeperatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/blog/[post-slug]/post-page.scss";

type MetadataProps = {
  params: Promise<{ ["post-slug"]: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export async function generateMetadata(props: MetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const postSlug = params["post-slug"];

  const reformattedLocationString = reformatLocationString(postSlug);

  return {
    title: `MH Blog: ${reformattedLocationString}`,
  };
}

export default async function Page(
  props: {
    params: Promise<{ ["post-slug"]: string }>;
  }
) {
  const params = await props.params;
  const postSlug = params["post-slug"];
  const isMobile = await isMobileDevice();
  const postPageData = await fetchPostPageData(postSlug);

  return (
    <main id="kst-blog-post-page">
      <Header style="light-theme" isMobile={isMobile} />
      {"id" in postPageData ? (
        <>
          <HeaderSection
            data={{
              title: postPageData.title,
              date: postPageData.date,
              author: postPageData.author,
              excerpt: postPageData.excerpt,
              readingTime: postPageData.readTime,
              img: postPageData.featuredImage,
            }}
          />
          <MainSection
            data={{
              content: postPageData.content,
              adjacentPostsSlugs: postPageData.adjacentPostSlugs,
            }}
          />
        </>
      ) : (
        <></>
      )}
      <FooterSeperatorSection style="light-theme" isMobile={isMobile} />
      <Footer style="light-theme" />
    </main>
  );
}
