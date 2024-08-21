import { PropertyData } from "@/app/types/propertyData";
import { LinkData } from "@/app/types/linkData";

export type LocationsPageData = {
  [key: string]: LocationPageData;
};

export type LocationPageData = {
  introSection: IntroSectionParameters;

  propertiesSection: PropertiesSectionParameters;

  mapSection: MapSectionParameters;

  slideSection: SlideSectionParameters;

  otherLocationsSection: OtherLocationsSectionParameters;

  faqSection: FAQSectionParameters;
};

export type IntroSectionParameters = {
  imgUrl: string;
  title: string;
  button: {
    text: string;
    color: string;
    href: string;
  };
};

export type PropertiesSectionParameters = {
  properties: PropertyData[];
  button: LinkData;
};

export type MapSectionParameters = {
  title: string;
  summary: string;
  latLong: {
    lat: number;
    lng: number;
  };
};

export type SlideSectionParameters = {
  title: string;
  slides: {
    title: string;
    imgUrl: string;
    summary: string;
  }[];
};

export type OtherLocationsSectionParameters = {
  title: string;
  locations: LinkData[];
};

export type FAQSectionParameters = {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
};
