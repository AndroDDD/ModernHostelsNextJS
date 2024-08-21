"use server";

import { fetchListings } from "../fecthListings";
import { PropertyData } from "@/app/types/propertyData";

const fetchLocationsAndProperties = async (selectedMarket: number | string) => {
  const fetchedListings = await fetchListings();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  let markets: string[] = [];
  let fetchedProperties: PropertyData[] = [];
  let currentIndexPointer = 0;
  let verifiedMarketIndex = 0;

  for (const market in fetchedListings) {
    markets.push(market);
    let selectedMarketVerified =
      typeof selectedMarket === "string"
        ? (() => {
            const marketNames = Object.keys(fetchedListings);
            const marketIndex = marketNames.findIndex((market) => {
              const formattedMarketName = market
                .toLowerCase()
                .replace(/ /g, "-");
              const isAMatch = formattedMarketName === selectedMarket;

              return isAMatch;
            });
            verifiedMarketIndex = marketIndex;
            return marketIndex;
          })()
        : selectedMarket;

    if (currentIndexPointer === selectedMarketVerified) {
      fetchedListings[market].listings.forEach((property: PropertyData) => {
        fetchedProperties.push(property);
      });
    }

    currentIndexPointer++;
  }

  const data = { markets, fetchedProperties, verifiedMarketIndex };

  return data;
};

export { fetchLocationsAndProperties };
