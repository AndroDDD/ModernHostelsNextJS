export type Properties = {
  [key: string]: {
    pageSlug: string;
    listings: PropertyData[];
  };
};

export type PropertyData = {
  propertyName: string;

  price: string;

  rating: number;

  location: string;

  latLong: {
    lat: number;
    lng: number;
  };

  available: string;

  numberOfGuests: number;

  numberOfBeds: number;

  numberOfBaths: number;

  numberOfOffices: number;

  amenities: AmenitiesList;

  images: string[];

  isMonthly: boolean;

  isNightly: boolean;

  pageSlug: string;

  dateLabel?: string;
};

export type AmenitiesList = {
  [key: string]: boolean;
};
