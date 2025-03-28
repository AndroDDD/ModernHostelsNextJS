"use client";

import { InquiryFormSendData } from "@/app/types/listPropertyFormSendData";
import { ListPropertyPageData } from "@/app/types/listPropertyPageData";
import { useState } from "react";
import ClienteleSection from "./clienteleSection";
import EarningsSection from "./earningsSection";
import FAQsSection from "./faqsSection";
import HowItWorksSection from "./howItWorksSection";
import InquiryForm from "./inquiryForm";
import IntroSection from "./introSection";
import PropertiesSlideSection from "./propertiesSlideSection";
import SingleReviewSection from "./singleReviewSection";
import SlidingImagesSection from "./slidingImagesSection";
import SlidingInformationSection from "./slidingInformationSection";

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
      {pageData ? <IntroSection {...pageData.introSection} /> : <></>}
      {pageData ? <EarningsSection {...pageData.earningsSection} /> : <></>}
      {pageData ? (
        <SlidingInformationSection {...pageData.slidingInformationSection} />
      ) : (
        <></>
      )}
      {
        <InquiryForm
          {...formSendData}
          {...pageData.inquiryFormSection}
          setFormSendData={setFormSendData}
          emailServerUrl={pageData.emailServer}
          csrfToken={pageData.csrfToken}
        />
      }
      {pageData ? <ClienteleSection {...pageData.clienteleSection} /> : <></>}
      {pageData ? (
        <PropertiesSlideSection {...pageData.propertiesSlideSection} />
      ) : (
        <></>
      )}
      {pageData ? (
        <SingleReviewSection {...pageData.singleReviewSection} />
      ) : (
        <></>
      )}
      {pageData ? <HowItWorksSection {...pageData.howItWorksSection} /> : <></>}
      {pageData ? (
        <SlidingImagesSection {...pageData.slidingImagesSection} />
      ) : (
        <></>
      )}
      {pageData ? <FAQsSection {...pageData.faqsSection} /> : <></>}
      <InquiryForm
        {...formSendData}
        title={"Talk to our Team"}
        buttonText={"Let's Go"}
        setFormSendData={setFormSendData}
        style={"end-piece"}
        emailServerUrl={pageData.emailServer}
        csrfToken={pageData.csrfToken}
      />
    </>
  );
};
