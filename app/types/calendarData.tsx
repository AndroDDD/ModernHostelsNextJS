import { BookNowFormSendData } from "./bookNowFormData";
import { FilterBarData } from "./mapPageData";
import { PropertyCalendarItemData } from "./propertyCalendarData";

export type TPropertyCheckInOutCalendar = {
  propertyPageSlug: string;
  calendarSpaceId?: string;
  setFormSendData: React.Dispatch<
    React.SetStateAction<BookNowFormSendData | FilterBarData>
  >;
};

export type TPropertyMonthBlock = {
  sideOfCalendar: string;
  calendarDatesData: PropertyCalendarItemData[];
  checkInOutDates: {
    in: string;
    out: string;
  };
  yearMonth: {
    year: string;
    month: string;
  };
  setYearMonth: React.Dispatch<
    React.SetStateAction<
      | {
          right: {
            year: string;
            month: string;
          };
          left: {
            year: string;
            month: string;
          };
        }
      | undefined
    >
  >;
  setSelectedCheckInOutDates: React.Dispatch<
    React.SetStateAction<{
      in: string;
      out: string;
    }>
  >;
  dateSelectingStatus: string;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
  selectedDateData: PropertyCalendarItemData | undefined;
  setSelectedDateData: React.Dispatch<
    React.SetStateAction<PropertyCalendarItemData | undefined>
  >;
};

export type TPropertyCalendarDays = {
  dates: PropertyCalendarItemData[];
  year: string;
  month: string;
  checkInOutDates: {
    in: string;
    out: string;
  };
  dateSelectingStatus: string;
  setSelectedCheckInOutDates: React.Dispatch<
    React.SetStateAction<{
      in: string;
      out: string;
    }>
  >;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
  selectedDateData: PropertyCalendarItemData | undefined;
  setSelectedDateData: React.Dispatch<
    React.SetStateAction<PropertyCalendarItemData | undefined>
  >;
};

export type TPropertyCalendarDayElementParameters = {
  isBooked: boolean;
  conditionalStyling: {
    containerSelectedClassName: string;
    priceDisplay: {
      static: {
        display: string;
      };
      dynamic: {
        display: string;
      };
    };
  };
  setSelectedDateData: React.Dispatch<
    React.SetStateAction<PropertyCalendarItemData | undefined>
  >;
  dateSelectingStatus: string;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCheckInOutDates: React.Dispatch<
    React.SetStateAction<{
      in: string;
      out: string;
    }>
  >;
  daysMinimumStay: number;
  checkInOutDates: {
    in: string;
    out: string;
  };
  dateData: PropertyCalendarItemData;
  dateFormatted: string;
  priceText: string;
  month: string;
  day: string;
  year: string;
};

export type TCompactCheckInOutCalendar = {
  setFiltersData: React.Dispatch<
    React.SetStateAction<BookNowFormSendData | FilterBarData>
  >;
};

export type TCompactMonthBlock = {
  checkInOutDates: {
    in: string;
    out: string;
  };
  setCheckInOutDates: React.Dispatch<
    React.SetStateAction<{
      in: string;
      out: string;
    }>
  >;
  dateSelectingStatus: string;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
  yearMonth: {
    year: string;
    month: string;
  };
  setYearMonth: React.Dispatch<
    React.SetStateAction<
      | {
          year: string;
          month: string;
        }
      | undefined
    >
  >;
};

export type TCompactCalendarDays = {
  year: string;
  month: string;
  checkInOutDates: {
    in: string;
    out: string;
  };
  dateSelectingStatus: string;
  setCheckInOutDates: React.Dispatch<
    React.SetStateAction<{
      in: string;
      out: string;
    }>
  >;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
};

export type TCompactCalendarDayElementParameters = {
  conditionalStyling: {
    containerSelectedClassName: string;
    priceDisplay: {
      static: {
        display: string;
      };
      dynamic: {
        display: string;
      };
    };
  };
  dateSelectingStatus: string;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
  setCheckInOutDates: React.Dispatch<
    React.SetStateAction<{
      in: string;
      out: string;
    }>
  >;
  checkInOutDates: {
    in: string;
    out: string;
  };
  dateFormatted: string;
  month: string;
  day: string;
  year: string;
};

export type TActionsElement = {
  checkInOutDates: {
    in: string;
    out: string;
  };
  setSelectedCheckInOutDates: React.Dispatch<
    React.SetStateAction<{
      in: string;
      out: string;
    }>
  >;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
  setFormData?: React.Dispatch<
    React.SetStateAction<BookNowFormSendData | FilterBarData>
  >;
  calendarType?: string;
};
