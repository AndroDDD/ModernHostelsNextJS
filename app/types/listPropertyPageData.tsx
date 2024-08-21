import { SimpleInformationData } from "@/app/types/simpleInformationData";

export type ListPropertyPageData = {
  introSection: IntroSection;

  earningsSection: EarningsSection;

  slidingInformationSection: SlidingInformationSection;

  clienteleSection: ClienteleSection;

  propertiesSlideSection: PropertiesSlideSection;

  singleReviewSection: SingleReviewSection;

  howItWorksSection: HowItWorksSection;

  slidingImagesSection: SlidingImagesSection;

  faqsSection: FAQsSection;
};

export type IntroSection = {
  title: string;
  subTitle: string;
  statement: string;
  backgroundImageUrl: string;
};

export type EarningsSection = {
  title: string;
  statement: string;
  stats: {
    title: string;
    statement: string;
  }[];
  statsImage: string;
};

export type SlidingInformationSection = {
  title: string;
  statement: string;
  info: SimpleInformationData[];
};

export type ClienteleSection = {
  title: string;
  statement: string;
  imgUrl: string;
  benefits: {
    title: string;
    statement: string;
  }[];
};

export type PropertiesSlideSection = {
  properties: {
    name: string;
    imgUrl: string;
    stats: {
      name: string;
      number: string;
    }[];
    review: {
      from: string;
      date: string;
      statement: string;
    };
  }[];
};

export type SingleReviewSection = {
  from: string;
  statement: string;
  backgroundImage?: string;
};

export type HowItWorksSection = {
  title: string;
  subTitle: string;
  steps: {
    [key: string]: {
      stepNumber: string;
      subjectText: string;
    }[];
  };
};

export type SlidingImagesSection = {
  title: string;
  statement: string;
  images: string[];
};

export type FAQsSection = {
  title: string;
  inquiries: {
    question: string;
    answer: string;
  }[];
};
