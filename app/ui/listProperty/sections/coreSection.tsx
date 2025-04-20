"use client";

import { InquiryFormSendData } from "@/app/types/listPropertyFormSendData";
import { ListPropertyPageData } from "@/app/types/listPropertyPageData";
import { useState } from "react";
import ClienteleSection, {
  isClienteleSectionRendered,
} from "./clienteleSection";
import EarningsSection, { isEarningsSectionRendered } from "./earningsSection";
import FAQsSection, { isFAQSectionRendered } from "./faqsSection";
import HowItWorksSection, {
  isHowItWorksSectionRendered,
} from "./howItWorksSection";
import InquiryForm from "./inquiryForm";
import IntroSection, { isIntroSectionRendered } from "./introSection";
import PropertiesSlideSection, {
  isPropertiesSlideSectionRendered,
} from "./propertiesSlideSection";
import SingleReviewSection, {
  isSingleReviewSectionRendered,
} from "./singleReviewSection";
import SlidingImagesSection, {
  isSlidingImagesSectionRendered,
} from "./slidingImagesSection";
import SlidingInformationSection, {
  isSlidingInformationSectionRendered,
} from "./slidingInformationSection";

export default (
  pageData: ListPropertyPageData & { emailServer: string; csrfToken: string }
) => {
  const [formSendData, setFormSendData] = useState<InquiryFormSendData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    propertyAddress: "",
  });

  return (
    <>
      {pageData && pageData.introSection ? (
        <IntroSection {...pageData.introSection} />
      ) : (
        <></>
      )}
      {pageData && pageData.earningsSection ? (
        <EarningsSection {...pageData.earningsSection} />
      ) : (
        <></>
      )}
      {pageData && pageData.slidingInformationSection ? (
        <SlidingInformationSection {...pageData.slidingInformationSection} />
      ) : (
        <></>
      )}
      {!(
        isIntroSectionRendered(pageData.introSection) ||
        isEarningsSectionRendered(pageData.earningsSection) ||
        isSlidingInformationSectionRendered(pageData.slidingInformationSection)
      ) && <div style={{ height: "150px" }}></div>}
      {pageData && pageData.inquiryFormSection ? (
        <InquiryForm
          {...formSendData}
          {...pageData.inquiryFormSection}
          setFormSendData={setFormSendData}
          emailServerUrl={pageData.emailServer}
          csrfToken={pageData.csrfToken}
        />
      ) : (
        <></>
      )}
      {pageData && pageData.clienteleSection ? (
        <ClienteleSection {...pageData.clienteleSection} />
      ) : (
        <></>
      )}
      {pageData && pageData.propertiesSlideSection ? (
        <PropertiesSlideSection {...pageData.propertiesSlideSection} />
      ) : (
        <></>
      )}
      {pageData && pageData.singleReviewSection ? (
        <SingleReviewSection {...pageData.singleReviewSection} />
      ) : (
        <></>
      )}
      {pageData && pageData.howItWorksSection ? (
        <HowItWorksSection {...pageData.howItWorksSection} />
      ) : (
        <></>
      )}
      {pageData && pageData.slidingImagesSection ? (
        <SlidingImagesSection {...pageData.slidingImagesSection} />
      ) : (
        <></>
      )}
      {pageData && pageData.faqsSection ? (
        <FAQsSection {...pageData.faqsSection} />
      ) : (
        <></>
      )}
      {pageData &&
      pageData.inquiryFormSection &&
      (isClienteleSectionRendered(pageData.clienteleSection) ||
        isPropertiesSlideSectionRendered(pageData.propertiesSlideSection) ||
        isSingleReviewSectionRendered(pageData.singleReviewSection) ||
        isHowItWorksSectionRendered(pageData.howItWorksSection) ||
        isSlidingImagesSectionRendered(pageData.slidingImagesSection) ||
        isFAQSectionRendered(pageData.faqsSection)) ? (
        <InquiryForm
          {...formSendData}
          {...pageData.inquiryFormSection}
          setFormSendData={setFormSendData}
          style={"end-piece"}
          emailServerUrl={pageData.emailServer}
          csrfToken={pageData.csrfToken}
        />
      ) : (
        <></>
      )}
    </>
  );
};
