import {
  PropertyCalendarData,
  PropertyCalendarItemData,
} from "@/app/types/propertyCalendarData";
import { wpPropertyCalendarApiUrl } from "@/app/constants/wpApiUrl";

export const fetchPropertyCalenderDataByDateRange = async (
  propertyPageSlug: string,
  checkIn: string,
  checkOut: string
): Promise<PropertyCalendarItemData[]> => {
  const propertyCalendarDataResponse = await fetch(
    `${wpPropertyCalendarApiUrl}get/${propertyPageSlug}`
  );
  const propertyCalendarData =
    (await propertyCalendarDataResponse.json()) as unknown as PropertyCalendarData;

  if (!propertyCalendarData) {
    return [];
  }

  const checkInDate = checkIn.split("-");
  const checkInDateYear = checkInDate[0];
  const checkInDateMonth = checkInDate[1];
  const checkInDateDay = checkInDate[2];
  const checkInDateEpochTime = new Date(`${checkIn}T00:00:00`).getTime();
  const checkOutDate = checkOut.split("-");
  const checkOutDateYear = checkOutDate[0];
  const checkOutDateMonth = checkOutDate[1];
  const checkOutDateDay = checkOutDate[2];
  const checkOutDateEpochTime = new Date(`${checkOut}T00:00:00`).getTime();

  let calendarData: PropertyCalendarItemData[] = [];

  if (checkInDateYear === checkOutDateYear) {
    if (checkInDateMonth === checkOutDateMonth) {
      const calendarMonthData = Object.values(
        propertyCalendarData[checkInDateYear][checkInDateMonth]
      );

      for (let i = 0; i < calendarMonthData.length; i++) {
        const itemDateEpochTime = new Date(
          `${calendarMonthData[i].date}T00:00:00`
        ).getTime();

        if (
          itemDateEpochTime >= checkInDateEpochTime &&
          itemDateEpochTime <= checkOutDateEpochTime
        ) {
          calendarData.push(calendarMonthData[i]);
        }
      }
    } else {
      const checkInOutDateMonthOffset = +checkOutDateMonth - +checkInDateMonth;

      for (let i = 0; i <= checkInOutDateMonthOffset; i++) {
        let currentMonthToCheck = `${i + +checkInDateMonth}`;
        currentMonthToCheck =
          currentMonthToCheck.length < 2
            ? `0${currentMonthToCheck}`
            : currentMonthToCheck;

        const daysData = Object.values(
          propertyCalendarData[checkInDateYear][currentMonthToCheck]
        );

        for (let dayIndex = 0; dayIndex < daysData.length; dayIndex++) {
          const itemDateEpochTime = new Date(
            `${daysData[dayIndex].date}T00:00:00`
          ).getTime();

          if (
            itemDateEpochTime >= checkInDateEpochTime &&
            itemDateEpochTime <= checkOutDateEpochTime
          ) {
            calendarData.push(daysData[dayIndex]);
          }
        }
      }
    }
  } else {
    const checkInOutDateYearOffset = +checkOutDateYear - +checkInDateYear;

    for (let i = 0; i <= checkInOutDateYearOffset; i++) {
      const currentYearToCheck = `${i + +checkInDateYear}`;
      const calendarYearData = propertyCalendarData[currentYearToCheck];
      const calendarYearDataArray = Object.entries(calendarYearData);

      if (currentYearToCheck === checkInDateYear) {
        calendarYearDataArray.forEach((item) => {
          if (item[0] >= checkInDateMonth) {
            const daysData = Object.values(item[1]);

            for (let dayIndex = 0; dayIndex < daysData.length; dayIndex++) {
              const itemDateEpochTime = new Date(
                `${daysData[dayIndex].date}T00:00:00`
              ).getTime();

              if (
                itemDateEpochTime >= checkInDateEpochTime &&
                itemDateEpochTime <= checkOutDateEpochTime
              ) {
                calendarData.push(daysData[dayIndex]);
              }
            }
          }
        });
      } else if (currentYearToCheck === checkOutDateYear) {
        calendarYearDataArray.forEach((item) => {
          if (item[0] <= checkOutDateMonth) {
            const daysData = Object.values(item[1]);

            for (let dayIndex = 0; dayIndex < daysData.length; dayIndex++) {
              const itemDateEpochTime = new Date(
                `${daysData[dayIndex].date}T00:00:00`
              ).getTime();

              if (
                itemDateEpochTime >= checkInDateEpochTime &&
                itemDateEpochTime <= checkOutDateEpochTime
              ) {
                calendarData.push(daysData[dayIndex]);
              }
            }
          }
        });
      } else {
        calendarYearDataArray.forEach((item) => {
          const daysData = Object.values(item[1]);

          for (let dayIndex = 0; dayIndex < daysData.length; dayIndex++) {
            calendarData.push(daysData[i]);
          }
        });
      }
    }
  }

  return calendarData;
};

export const fetchPropertyCalenderMonthData = async (
  propertyPageSlug: string,
  year: string,
  month: string
): Promise<PropertyCalendarItemData[]> => {
  const propertyCalendarDataResponse = await fetch(
    `${wpPropertyCalendarApiUrl}get/${propertyPageSlug}`
  );

  const propertyCalendarData = await propertyCalendarDataResponse.json();

  console.log({ propertyCalendarData });

  if (
    !propertyCalendarData ||
    !propertyCalendarData[year] ||
    !propertyCalendarData[year][month]
  ) {
    return [];
  }
  const propertyCalendarMonthData = Object.values(
    propertyCalendarData[year][month]
  ).map((calendarDate: any) => ({
    isBooked: calendarDate.is_booked,
    minimumDaysStay: calendarDate.minimum_days_stay,
    price: calendarDate.price,
    date: calendarDate.date,
  }));

  propertyCalendarMonthData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  console.log({ propertyCalendarMonthData });

  return propertyCalendarMonthData;
};

export const fetchPropertyCalenderData = async (
  propertyPageSlug: string
): Promise<PropertyCalendarData> => {
  const propertyCalendarDataResponse = await fetch(
    `${wpPropertyCalendarApiUrl}get/${propertyPageSlug}`
  );
  const propertyCalendarData =
    (await propertyCalendarDataResponse.json()) as unknown as PropertyCalendarData;

  console.log({ propertyCalendarData });

  return propertyCalendarData;
};
