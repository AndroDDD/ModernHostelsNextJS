"use server";

import {
  PropertyCalendarData,
  PropertyCalendarItemData,
} from "@/app/types/propertyCalendarData";
import { wpPropertyCalendarApiUrl } from "@/app/constants/wpApiUrl";

export const fetchPropertyCalenderDataByDateRange = async (
  propertyPageSlug: string,
  checkIn: string,
  checkOut: string,
  calendarSpaceId: string | null = null
): Promise<PropertyCalendarItemData[]> => {
  const propertyCalendarDataResponse = await fetch(
    `${wpPropertyCalendarApiUrl}get/${propertyPageSlug}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        calendar_space_id: calendarSpaceId,
      }),
    }
  );
  const propertyCalendarData =
    (await propertyCalendarDataResponse.json()) as unknown as {
      [key: string]: {
        [key: string]: {
          price: number;
          date: string;
          pet_fee: number;
          is_booked: boolean;
          minimum_days_stay: number;
          cleaning_fee: number;
        }[];
      };
    };

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
          const reStructuredData = {
            price: calendarMonthData[i].price,
            minimumDaysStay: calendarMonthData[i].minimum_days_stay,
            date: calendarMonthData[i].date,
            isBooked: calendarMonthData[i].is_booked,
            petFee: calendarMonthData[i].pet_fee,
            cleaningFee: calendarMonthData[i].cleaning_fee,
          };
          calendarData.push(reStructuredData);
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
            const reStructuredData = {
              price: daysData[dayIndex].price,
              minimumDaysStay: daysData[dayIndex].minimum_days_stay,
              date: daysData[dayIndex].date,
              isBooked: daysData[dayIndex].is_booked,
              petFee: daysData[dayIndex].pet_fee,
              cleaningFee: daysData[dayIndex].cleaning_fee,
            };
            calendarData.push(reStructuredData);
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
                const reStructuredData = {
                  price: daysData[dayIndex].price,
                  minimumDaysStay: daysData[dayIndex].minimum_days_stay,
                  date: daysData[dayIndex].date,
                  isBooked: daysData[dayIndex].is_booked,
                  petFee: daysData[dayIndex].pet_fee,
                  cleaningFee: daysData[dayIndex].cleaning_fee,
                };
                calendarData.push(reStructuredData);
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
                const reStructuredData = {
                  price: daysData[dayIndex].price,
                  minimumDaysStay: daysData[dayIndex].minimum_days_stay,
                  date: daysData[dayIndex].date,
                  isBooked: daysData[dayIndex].is_booked,
                  petFee: daysData[dayIndex].pet_fee,
                  cleaningFee: daysData[dayIndex].cleaning_fee,
                };
                calendarData.push(reStructuredData);
              }
            }
          }
        });
      } else {
        calendarYearDataArray.forEach((item) => {
          const daysData = Object.values(item[1]);

          for (let dayIndex = 0; dayIndex < daysData.length; dayIndex++) {
            const reStructuredData = {
              price: daysData[dayIndex].price,
              minimumDaysStay: daysData[dayIndex].minimum_days_stay,
              date: daysData[dayIndex].date,
              isBooked: daysData[dayIndex].is_booked,
              petFee: daysData[dayIndex].pet_fee,
              cleaningFee: daysData[dayIndex].cleaning_fee,
            };
            calendarData.push(reStructuredData);
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
  month: string,
  calendarSpaceId: string | null = null
): Promise<PropertyCalendarItemData[]> => {
  console.log({ tryFetchCalendarSpaceId: calendarSpaceId });
  const propertyCalendarDataResponse = await fetch(
    `${wpPropertyCalendarApiUrl}get/${propertyPageSlug}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        calendar_space_id: calendarSpaceId,
      }),
    }
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
    petFee: calendarDate.pet_fee,
    cleaningFee: calendarDate.cleaning_fee,
  }));

  propertyCalendarMonthData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  console.log({ propertyCalendarMonthData });

  return propertyCalendarMonthData;
};

export const fetchPropertyCalenderData = async (
  propertyPageSlug: string,
  calendarSpaceId: string | null = null
): Promise<PropertyCalendarData> => {
  const propertyCalendarDataResponse = await fetch(
    `${wpPropertyCalendarApiUrl}get/${propertyPageSlug}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        calendar_space_id: calendarSpaceId,
      }),
    }
  );
  const propertyCalendarData =
    (await propertyCalendarDataResponse.json()) as unknown as PropertyCalendarData;

  console.log({ propertyCalendarData });

  return propertyCalendarData;
};
