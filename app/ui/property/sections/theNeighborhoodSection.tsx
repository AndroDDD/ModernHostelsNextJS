"use client";
import { useEffect, useState } from "react";

import { TheNeighborhoodSection } from "@/app/types/propertyPageData";
import "@/app/ui/styles/scss/components/property/sections/the-neighborhood-section.scss";
import GoogleMapSection from "../../sharedComponents/map/mapSection";

export default ({
  title,
  mapSnapshotUrl,
  locations,
}: TheNeighborhoodSection) => {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<number>(0);

  const checkIfAllLocationsAreEmpty = (locations: {
    [key: string]: {
      name: string;
      imgUrl: string;
      milesAway: number;
    }[];
  }) => {
    let allKeysEmpty = true;

    Object.keys(locations).forEach((key) => {
      if (locations[key].length > 0) {
        allKeysEmpty = false;
      }
    });

    return allKeysEmpty;
  };

  useEffect(() => {
    setSelectedCategory(Object.keys(locations)[0]);
  }, []);

  return (
    <section
      id="kst-property-page-the-neighborhood-section"
      style={checkIfAllLocationsAreEmpty(locations) ? { display: "none" } : {}}
    >
      <div className="kst-property-page-the-neighborhood-section-areas">
        <div className="kst-property-page-the-neighborhood-section-areas-title">
          {title}
        </div>

        <div className="kst-property-page-the-neighborhood-section-areas-links">
          {Object.keys(locations).map((locationCategory, index) =>
            locations[locationCategory].length > 0 ? (
              <div
                className="kst-property-page-the-neighborhood-section-areas-link"
                style={index === 0 ? { color: "#6d6d6d" } : {}}
                onClick={(event) => {
                  event.preventDefault();

                  let categoryLinks = (
                    event.currentTarget.parentElement as HTMLDivElement
                  ).children as unknown as HTMLDivElement[];

                  for (let i = 0; i < categoryLinks.length; i++) {
                    categoryLinks[i].style.color = "#aaa";
                  }

                  event.currentTarget.style.color = "#6d6d6d";

                  setSelectedCategory(event.currentTarget.innerText);
                }}
              >
                {locationCategory}
              </div>
            ) : (
              <></>
            )
          )}
        </div>

        <div className="kst-property-page-the-neighborhood-section-areas-details">
          {selectedCategory ? (
            locations[selectedCategory].map((locationData, index) => (
              <div
                className="kst-property-page-the-neighborhood-section-areas-detail"
                onClick={(e) => {
                  setSelectedLocation(index);
                }}
              >
                <div className="kst-property-page-the-neighborhood-section-areas-detail-image">
                  <img src={locationData.imgUrl} />
                </div>

                <div className="kst-property-page-the-neighborhood-section-areas-detail-location">
                  {locationData.name}
                </div>

                <div className="kst-property-page-the-neighborhood-section-areas-detail-miles-away">
                  {`${locationData.milesAway} miles`}
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="kst-property-page-the-neighborhood-section-map">
        {selectedCategory &&
        locations[selectedCategory][selectedLocation] &&
        locations[selectedCategory][selectedLocation]["latLong"] ? (
          <GoogleMapSection
            center={locations[selectedCategory][selectedLocation]["latLong"]}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};
