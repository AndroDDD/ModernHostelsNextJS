"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { BookNowFormSendData } from "@/app/types/bookNowFormData";
import { FilterBarData } from "@/app/types/mapPageData";
import { PropertyData } from "@/app/types/propertyData";
import { fetchLocationsAndProperties } from "@/app/generalFunctions/apiDataFetches/mapRoute/fetchLocationsAndProperties";
import FilterBarSection from "@/app/ui/map/sections/filterBarSection";
import PropertiesSection from "@/app/ui/map/sections/propertiesSection";
import "@/app/ui/styles/scss/components/map/sections/core-section.scss";

type CoreSectionI = {
  marketName?: string;
};
export default ({ marketName }: CoreSectionI) => {
  const [filterBarData, setFilterBarData] = useState<
    BookNowFormSendData | FilterBarData
  >({
    markets: {
      selectedIndex: 0,
      list: [],
    },
    dates: {
      start: "",
      end: "",
    },
    maxPrice: 0,
    beds: {
      value: 0,
      useExact: false,
    },
    bathrooms: {
      value: 0,
      useExact: false,
    },
    workstations: {
      value: 0,
      useExact: false,
    },
    amenities: {
      kitchen: false,
      airConditioning: false,
      allUtilitiesIncluded: false,
      television: false,
      washerAndDryer: false,
      heating: false,
      cable: false,
      computerMonitor: false,
    },
  });
  const [selectedMarketIndex, setSelectedMarketIndex] = useState<number>(0);
  const [properties, setProperties] = useState<PropertyData[]>();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    console.log({ filterBarData });
    async function handleFilterBarDataChange() {
      if ("markets" in filterBarData && filterBarData.markets.list.length < 1) {
        fetchLocationsAndProperties(marketName ?? selectedMarketIndex).then(
          async ({ markets, fetchedProperties, verifiedMarketIndex }) => {
            console.log({
              from: "core-section",
              markets,
              fetchedProperties,
              verifiedMarketIndex,
            });

            setFilterBarData((prevFilterBarData) => {
              if ("markets" in prevFilterBarData) {
                return {
                  ...prevFilterBarData,
                  markets: {
                    ...prevFilterBarData.markets,
                    list: markets,
                    selectedIndex: verifiedMarketIndex,
                  },
                };
              }

              return prevFilterBarData;
            });
            setProperties(fetchedProperties);
          }
        );
      } else if (
        "markets" in filterBarData &&
        filterBarData.markets.selectedIndex !== selectedMarketIndex
      ) {
        setSelectedMarketIndex(filterBarData.markets.selectedIndex);

        fetchLocationsAndProperties(filterBarData.markets.selectedIndex).then(
          ({ markets, fetchedProperties, verifiedMarketIndex }) => {
            setProperties(fetchedProperties);

            console.log({
              markets,
              fetchedProperties,
              selectedMarketIndex: verifiedMarketIndex,
            });

            const params = new URLSearchParams();
            params.set(
              "market",
              markets[filterBarData.markets.selectedIndex]
                .toLowerCase()
                .replace(/ /g, "-")
            );

            replace(`${pathname}?${params.toString()}`);
          }
        );
      }
    }

    handleFilterBarDataChange();
  }, [filterBarData]);

  return (
    <div id="kst-map-core-section">
      {filterBarData &&
      "markets" in filterBarData &&
      filterBarData.markets.list.length > 0 ? (
        <FilterBarSection
          {...filterBarData}
          setFilterBarData={setFilterBarData}
        />
      ) : (
        <></>
      )}
      {properties ? (
        <PropertiesSection
          properties={properties}
          filterBarData={filterBarData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
