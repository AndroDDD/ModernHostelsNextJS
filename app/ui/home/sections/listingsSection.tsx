"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchListings } from "@/app/generalFunctions/apiDataFetches/fecthListings";
import { Properties } from "@/app/types/propertyData";
import PropertyBadge from "@/app/ui/sharedComponents/propertyBadge";

import "@/app/ui/styles/scss/components/home/sections/listings-section.scss";

export default () => {
  const router = useRouter();
  const [listings, setListings] = useState<Properties>();
  const [selectedLocation, setSelectedLocation] = useState<string>();

  useEffect(() => {
    (async () => {
      const fetchedListings = await fetchListings();
      setTimeout(() => {
        setListings(fetchedListings);
        console.log({ fetchedListings });
        setSelectedLocation(() => {
          const locationName = Object.values(fetchedListings)[0].pageSlug;

          return locationName;
        });
      }, 1000);
    })();
  }, []);

  return (
    <section id="kst-home-listings-section">
      <div className="kst-home-listings-section-header">
        {listings ? (
          Object.entries(listings).map((location, index) => {
            return (
              <div
                key={`kst-home-listings-item-element-${index}`}
                className="kst-home-listings-section-header-button"
                style={
                  location[1].pageSlug === selectedLocation
                    ? { borderBottom: "solid 3px darkcyan" }
                    : {}
                }
                onClick={(event) => {
                  const listingsSectionElement = event.currentTarget
                    .parentElement?.nextSibling as HTMLDivElement;

                  setSelectedLocation(location[1].pageSlug);
                  listingsSectionElement.scrollLeft = 0;
                }}
              >
                {location[0]}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>

      <div className="kst-home-listings-section-content">
        {listings && selectedLocation ? (
          verifyLocationData(listings, selectedLocation).length > 0 ? (
            Object.values(listings)
              .find(
                (locationData) => locationData.pageSlug === selectedLocation
              )
              ?.listings.slice(0, 6)
              .map((property) => {
                return (
                  <div className="kst-home-listings-section-content-post">
                    <PropertyBadge property={property} />
                  </div>
                );
              })
          ) : (
            <div className="kst-home-listings-section-content-empty">
              {
                "No properties listed for the location... Reach out to us if you are wishing to list here!"
              }
            </div>
          )
        ) : (
          <></>
        )}
      </div>

      <div
        className="kst-home-listings-section-view-all-button"
        onClick={(event) => {
          let location = selectedLocation;

          const locationUrl = `/location/${location}`;

          router.push(locationUrl);
        }}
      >
        {"View All"}
      </div>
    </section>
  );
};

const verifyLocationData = (
  listings: Properties | undefined,
  selectedLocation: string
) => {
  if (listings) {
    const verified = Object.values(listings).find(
      (locationData) => locationData.pageSlug === selectedLocation
    );

    if (verified) {
      return verified.listings;
    } else {
      return [];
    }
  }
  return [];
};
