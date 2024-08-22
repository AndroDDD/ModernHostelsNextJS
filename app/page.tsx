import { SimpleInformationDataArray } from "@/app/types/simpleInformationData";
import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import { homepageSettingsApiUrl } from "./constants/wpApiUrl";
import { fetchHomePageSettings } from "@/app/generalFunctions/apiDataFetches/homeRoute/fetchHomePageSettings";
import Header from "@/app/ui/headerAndFooter/header/header";
import IntroSection from "@/app/ui/home/sections/introSection";
import ListingsSection from "@/app/ui/home/sections/listingsSection";
import VideoScrollSection from "@/app/ui/home/sections/videoScrollSection";
import InformationCarouselSection from "@/app/ui/home/sections/informationCarouselSection";
import HighlightSection from "@/app/ui/home/sections/highlightSection";
import ImageCollageSection from "@/app/ui/home/sections/imageCollageSection";
import CallToActionSection from "@/app/ui/home/sections/callToActionSection";
import SingleItemSection from "@/app/ui/home/sections/singleItemSection";
import TwoLinkCallToActionSection from "@/app/ui/home/sections/twoLinkCallToActionSection";
import FooterSeparatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/home/home-component.scss";

export default async function Home() {
  const isMobile = await isMobileDevice();
  const homePageSettings = await fetchHomePageSettings(homepageSettingsApiUrl);

  console.log({ homePageSettings });
  const introSectionData = JSON.parse(
    homePageSettings["homePageIntroSectionData"],
    function (key, value) {
      if (key === "background_image_url") {
        this.backgroundImageUrl = value;
      } else if (key === "hero_title") {
        this.title = value;
      } else if (key === "sub_text") {
        this.subText = value;
      } else if (key === "right_button_text") {
        this.rightButtonTitle = value;
      } else if (key === "menu_title") {
        this.dropdownMenuTitle = value;
      } else if (key === "menu_items") {
        this.dropdownMenuItems = Object.values(
          value as { name: string; slug: string }[]
        )
          .map((item: { name: string; slug: string }) => ({
            name: item.name,
            pageSlug: item.slug,
          }))
          .reverse();
      } else {
        return value;
      }
    }
  );
  const scrollVideo = homePageSettings["homePageScrollVideo"];
  const simpleInformationCarouselData = Object.values(
    JSON.parse(
      homePageSettings["homePageInformationCarouselData"],
      function (key, value) {
        if (key === "img_url") {
          this.imageUrl = value;
        } else if (key === "summary") {
          this.information = value;
        } else {
          return value;
        }
      }
    )
  ) as SimpleInformationDataArray;
  const highlightsSectionData = JSON.parse(
    homePageSettings["highlightsSectionData"],
    function (key, value) {
      if (key === "background_image") {
        this.backgroundImageURL = value;
      } else if (key === "header_title") {
        this.headerTitle = value;
      } else if (key === "highlights") {
        return Object.values(value);
      } else {
        return value;
      }
    }
  );
  const imageCollageSectionData = JSON.parse(
    homePageSettings["imageCollageSectionData"]
  );
  const callToActionSectionData = JSON.parse(
    homePageSettings["callToActionSectionData"],
    function (key, value) {
      if (key === "link_text") {
        this.linkText = value;
      } else if (key === "background_image") {
        this.backgroundImage = value;
      } else {
        return value;
      }
    }
  ) as {
    title: string;
    link: string;
    linkText: string;
    backgroundImage: string;
  };
  const singleItemSectionOne = JSON.parse(
    homePageSettings[`locationAndPropertyLinksSectionData0`],
    function (key, value) {
      if (key === "image_url") {
        this.imageUrl = value;
      } else if (key === "location_link") {
        this.viewCollectionLink = {
          text: "View Collection",
          href: value,
          color: "",
        };
      } else if (key === "property_link") {
        this.viewItemLink = {
          text: "View Property",
          href: value,
          color: "",
        };
      } else {
        return value;
      }
    }
  );
  const singleItemSectionTwo = JSON.parse(
    homePageSettings[`locationAndPropertyLinksSectionData0`],
    function (key, value) {
      if (key === "image_url") {
        this.imageUrl = value;
      } else if (key === "location_link") {
        this.viewCollectionLink = {
          text: "View Collection",
          href: value,
          color: "",
        };
      } else if (key === "property_link") {
        this.viewItemLink = {
          text: "View Property",
          href: value,
          color: "",
        };
      } else {
        return value;
      }
    }
  );

  return (
    <main id="kst-rc-home">
      <Header key={"kst-home-header"} isMobile={isMobile} />
      <IntroSection
        key={"kst-home-intro-section"}
        introSectionData={introSectionData}
      />
      <ListingsSection key={"kst-home-listings-section"} />
      {/* {isMobile ? (
        <></>
      ) : (
        <VideoScrollSection
          key={"kst-home-scroll-video-section"}
          scrollVideo={scrollVideo}
        />
      )} */}
      <InformationCarouselSection
        simpleInformationArray={simpleInformationCarouselData}
        isMobile={isMobile}
        key={"kst-home-information-carousel-section"}
      />
      <HighlightSection
        key={"kst-home-highlights-section"}
        highlightSectionData={highlightsSectionData}
        isMobile={isMobile}
      />
      {isMobile ? (
        <></>
      ) : (
        <ImageCollageSection
          key={"kst-home-image-collage-section"}
          imageCollageSectionData={imageCollageSectionData}
        />
      )}
      <CallToActionSection
        sectionData={callToActionSectionData}
        key={"kst-home-call-to-action-section"}
      />
      <SingleItemSection
        isMobile={isMobile}
        itemData={singleItemSectionOne}
        direction={"ltr"}
        key={"kst-home-single-item-section-one"}
      />
      <SingleItemSection
        isMobile={isMobile}
        itemData={singleItemSectionTwo}
        direction={"rtl"}
        key={"kst-home-single-item-section-two"}
      />
      <TwoLinkCallToActionSection
        key={"kst-home-two-link-call-to-action-section"}
      />
      <FooterSeparatorSection
        isMobile={isMobile}
        key={"kst-home-footer-seperator-section"}
      />
      <Footer key={"kst-home-footer"} />
    </main>
  );
}
