import { LinkData } from "@/app/types/linkData";
import { PropertyData } from "@/app/types/propertyData";
import { SnapshotBadgeData } from "@/app/types/snapshotBadgeData";
import { TestimonialBadgeParameters } from "@/app/types/testimonialBadgeParameters";

export type PropertyPageData = {
  pageSlug: string;

  nameOfProperty: string;

  headerSection: HeaderSection;

  imageCollageSection: ImageCollageSection;

  overviewSection: OverviewSection;

  categorizedImagesSection: CategorizedImagesSection;

  cancellationPolicySection: CancellationPolicySection;

  theNeighborhoodSection: TheNeighborhoodSection;

  reviewsSection: ReviewsSection;

  alsoViewedSection: AlsoViewedSection;
};

export type HeaderSection = {
  title: string;

  summary: [
    {
      numberOfReviews: number;
      numberOfStars: number;
    },
    ...{ statName: string; statNumber: number }[]
  ];

  link: LinkData;
};

export type ImageCollageSection = {
  imageUrls: string[];
};

export type OverviewSection = {
  propertyPageSlug: string;

  propertyName: string;

  propertyImageUrl: string;

  numberOfBeds: number;

  numberOfBaths: number;

  propertyPrice: string;

  headerTitle: string;

  snapShots: SnapshotBadgeData[];

  aboutTheSpace: {
    title: string;
    summary: string;
  };

  spaces: {
    calendar_space_id: string;
    label: string;
    show_displays: boolean;
    is_rentable: boolean;
    displays: {
      title: string;
      description: string;
      img_url: string;
    }[];
  }[];

  amenitiesSummary: string;

  amenitiesList: PageDataAmenitiesList;

  workstationsSummary?: string;

  workstationsList?: string[];
};

export type PageDataAmenitiesList = PageDataAmenity[];

export type PageDataAmenity = {
  itemName: string;
  itemDisplayText: string;
  icon: string;
};

export type CategorizedImagesSection = {
  [key: string]: string[];
};

export type CancellationPolicySection = {
  headerTitle: string;
  cancellationPolicy: string;
  securityDepositPolicy: string;
  respondToEmail: string;
};

export type TheNeighborhoodSection = {
  title: string;

  mapSnapshotUrl: string;

  locations: {
    [key: string]: {
      name: string;
      imgUrl: string;
      milesAway: number;
      latLong: {
        lat: number;
        lng: number;
      };
    }[];
  };
};

export type ReviewsSection = {
  numberOfReviews: number;

  numberOfStars: number;

  otherStats: {
    statName: string;
    numberOfStars: number;
  }[];

  testimonials: TestimonialBadgeParameters[];
};

export type AlsoViewedSection = {
  title: string;
  properties: PropertyData[];
};
