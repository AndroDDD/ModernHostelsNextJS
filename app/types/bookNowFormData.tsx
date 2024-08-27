export type BookNowFormParameters = {
  headerText: string;
  discountText: string;
  propertyPageSlug: string;
  propertyName: string;
  propertyImageUrl: string;
  numberOfBeds: number;
  numberOfBaths: number;
  bookNowFormExpandFormContainerRef?: React.MutableRefObject<HTMLDivElement | null>;
  calendarSpaces?: {
    calendar_space_id: string;
    label: string;
    displays: {
      title: string;
      description: string;
      img_url: string;
    }[];
  }[];
};

export type BookNowFormSendData = {
  dates: {
    checkIn: string;
    checkOut: string;
  };
  hasPet: boolean;
};

export type PriceTotalsDisplay = {
  avgNight: string;
  totalDue: string;
  subTotal: string;
  fees: {
    pet?: string | null;
    cleaning: string;
    service: string;
  };
  taxes: string;
  taxesFeesCombined: string;
};
