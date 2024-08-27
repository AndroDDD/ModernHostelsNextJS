export type PropertiesCalendarData = {
  [key: string]: PropertyCalendarData;
};

export type PropertyCalendarData = {
  [key: string]: {
    [key: string]: PropertyCalendarItemData[];
  };
};

export type PropertyCalendarItemData = {
  date: string;
  isBooked: boolean;
  price: number;
  minimumDaysStay: number;
  petFee: number;
  cleaningFee: number;
};
