import { PropertyData } from "@/app/types/propertyData";
import { calculateSortValue } from "@/app/generalFunctions/calculateSortValue";
import { calculateMonthlyPrice } from "@/app/generalFunctions/calculateMonthlyPrice";
import { monthsAbbreviated } from "@/app/constants/months";

export const sortProperties = (sortBy: string, properties: PropertyData[]) => {
  let sortedProperties: PropertyData[];

  switch (sortBy) {
    case "Price":
      {
        sortedProperties = properties.sort((a, b) => {
          const aPrice = calculateMonthlyPrice(a.price) ?? Number(a.price);
          const bPrice = calculateMonthlyPrice(b.price) ?? Number(b.price);

          return calculateSortValue(aPrice, bPrice);
        });
      }
      break;

    case "Bedrooms":
      {
        sortedProperties = properties.sort((a, b) =>
          calculateSortValue(a.numberOfBeds, b.numberOfBeds)
        );
      }
      break;

    case "Availability":
      {
        sortedProperties = properties.sort((a, b) => {
          const aDate = a.available.split(" ");
          const bDate = b.available.split(" ");
          const monthsArray = Object.entries(monthsAbbreviated);

          let aDay = aDate[1];
          let aMonth = aDate[0];
          let aYear = aDate[2];

          let bDay = bDate[1];
          let bMonth = bDate[0];
          let bYear = bDate[2];

          aDay =
            aDay[aDay.length - 1] === ","
              ? aDay.substring(0, aDay.length - 1)
              : aDay;
          aDay = aDay.length < 2 ? `0${aDay}` : aDay;

          const newAMonth = monthsArray.find((month) => month[1] === aMonth);
          if (newAMonth) {
            aMonth = newAMonth[0];
          }

          bDay =
            bDay[bDay.length - 1] === ","
              ? bDay.substring(0, bDay.length - 1)
              : bDay;
          bDay = bDay.length < 2 ? `0${bDay}` : bDay;

          const newBMonth = monthsArray.find((month) => month[1] === bMonth);
          if (newBMonth) {
            bMonth = newBMonth[0];
          }

          const aFormattedDate = new Date(
            `${aYear}-${aMonth}-${aDay}T00:00:00`
          );
          const bFormattedDate = new Date(
            `${bYear}-${bMonth}-${bDay}T00:00:00`
          );

          const aDateEpochTime = aFormattedDate.getTime();
          const bDateEpochTime = bFormattedDate.getTime();

          return calculateSortValue(aDateEpochTime, bDateEpochTime);
        });
      }
      break;

    case "Ratings":
      {
        sortedProperties = properties.sort((a, b) =>
          calculateSortValue(a.rating, b.rating, false)
        );
      }
      break;

    default: {
      sortedProperties = properties;
    }
  }

  return { fetchedSortedProperties: sortedProperties };
};
