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
};

export type AmenitiesList = {
  [key: string]: boolean;
  ["kitchen"]: boolean;
  ["airConditioning"]: boolean;
  ["television"]: boolean;
  ["washerAndDryer"]: boolean;
  ["heating"]: boolean;
  ["cable"]: boolean;
  ["computerMonitor"]: boolean;
  ["bedding"]: boolean;
  ["cookware"]: boolean;
  ["tableware"]: boolean;
  ["iron"]: boolean;
  ["pool"]: boolean;
  ["linens"]: boolean;
  ["wifi"]: boolean;
};
