import { PriceTotalsDisplay } from "./bookNowFormData";

export type BookingDataForCookie = {
  propertyName: string;
  propertyImageUrl: string;
  propertyPageSlug: string;
  spaces: {
    beds: number;
    baths: number;
  };
  dates: {
    checkIn: string;
    checkOut: string;
  };
  hasPet: boolean;
  priceTotals: PriceTotalsDisplay;
  contact?: {
    name: string;
    email: string;
  };
  orderData?: any;
  calendarSpaceId?: string;
};
