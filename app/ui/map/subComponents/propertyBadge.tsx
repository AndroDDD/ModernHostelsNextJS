import React, { useState } from "react";
import Image from "next/image";

import { PropertyData } from "@/app/types/propertyData";
import { formatAvgPriceText } from "@/app/generalFunctions/formatAvgPriceText";
import { determineItemIsMonthlyIsNightlyVisibility } from "@/app/generalFunctions/determineItemIsMonthlyIsNightlyVisibility";
import ReviewStars from "@/app/ui/sharedComponents/reviewStars";
import "@/app/ui/styles/scss/components/map/sub-components/property-badge.scss";

const PropertyBadge: React.FC<{
  property: PropertyData;
  settings: {
    isMonthly: boolean;
    isNightly: boolean;
  };
  badgeOnClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  viewPropertyOnClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}> = ({ property, settings, badgeOnClick, viewPropertyOnClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div
      className="kst-map-page-properties-section-list-item"
      style={{
        display: determineItemIsMonthlyIsNightlyVisibility(
          settings.isMonthly,
          settings.isNightly,
          property.isMonthly,
          property.isNightly
        ),
      }}
      onClick={badgeOnClick ?? (() => {})}
    >
      <div className="kst-map-page-properties-section-list-item-image-date">
        <Image
          src={property.images ? property.images[currentImageIndex] : ""}
          width={500}
          height={500}
          alt=""
        />

        <div className="kst-map-page-properties-section-list-item-date">{`Available ${property.available}`}</div>

        <div className="kst-map-page-properties-section-list-item-image-navigation">
          <div
            className="kst-map-page-properties-section-list-item-image-navigation-prev"
            onClick={(event) => {
              event.preventDefault();

              setCurrentImageIndex((prevIndex) =>
                prevIndex - 1 < 0 ? property.images.length - 1 : prevIndex - 1
              );
            }}
          >
            {"<"}
          </div>

          <div
            className="kst-map-page-properties-section-list-item-image-navigation-next"
            onClick={(event) => {
              event.preventDefault();

              setCurrentImageIndex((prevIndex) =>
                prevIndex + 1 > property.images.length - 1 ? 0 : prevIndex + 1
              );
            }}
          >
            {">"}
          </div>
        </div>
      </div>

      <div className="kst-map-page-properties-section-list-item-info">
        <div className="kst-map-page-properties-section-list-item-name">
          {property.propertyName}
        </div>

        <div className="kst-map-page-properties-section-list-item-location">
          {property.location}
        </div>

        <div className="kst-map-page-properties-section-list-item-rating">
          <ReviewStars numberOfStars={property.rating} />
        </div>

        <div className="kst-map-page-properties-section-list-item-specs-price">
          <div className="kst-map-page-properties-section-list-item-spec">
            <div className="kst-map-page-properties-section-list-item-spec-name">
              {"Guests"}
            </div>

            <div className="kst-map-page-properties-section-list-item-spec-number">
              {property.numberOfGuests}
            </div>
          </div>

          <div className="kst-map-page-properties-section-list-item-spec">
            <div className="kst-map-page-properties-section-list-item-spec-name">
              {"Bedrooms"}
            </div>

            <div className="kst-map-page-properties-section-list-item-spec-number">
              {property.numberOfBeds}
            </div>
          </div>

          <div className="kst-map-page-properties-section-list-item-spec">
            <div className="kst-map-page-properties-section-list-item-spec-name">
              {"Bathrooms"}
            </div>

            <div className="kst-map-page-properties-section-list-item-spec-number">
              {property.numberOfBaths}
            </div>
          </div>

          <div className="kst-map-page-properties-section-list-item-spec">
            <div className="kst-map-page-properties-section-list-item-spec-name">
              {"Workstations"}
            </div>

            <div
              className="kst-map-page-properties-section-list-item-spec-number"
              style={{ border: "none" }}
            >
              {property.numberOfOffices}
            </div>
          </div>

          <div className="kst-map-page-properties-section-list-item-price">
            {formatAvgPriceText(property.price).map((priceText, index) =>
              index === 0 ? (
                <div className="kst-map-page-properties-section-list-item-price-header">
                  {`Avg. price per ${priceText}`}
                </div>
              ) : (
                <div className="kst-map-page-properties-section-list-item-price-number">
                  {`${priceText}`}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <button
        className="kst-map-page-properties-section-view-page"
        onClick={viewPropertyOnClick ?? (() => {})}
      >
        {"View Property Page"}
      </button>
    </div>
  );
};

export { PropertyBadge as default };
