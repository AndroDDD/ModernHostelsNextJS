"use client";
import { useState } from "react";

import { PropertyData } from "@/app/types/propertyData";
import "@/app/ui/styles/scss/components/property/sub-components/property-badge.scss";

export default ({
  propertyName,
  price,
  rating,
  location,
  available,
  numberOfGuests,
  numberOfBeds,
  numberOfBaths,
  numberOfOffices,
  images,
  pageSlug,
}: PropertyData) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className="kst-property-page-property-badge">
      <div className="kst-property-page-property-badge-name">
        {propertyName}
      </div>

      <div className="kst-property-page-property-badge-location-rating">
        <div className="kst-property-page-property-badge-location">
          {location}
        </div>

        <div className="kst-property-page-property-badge-rating">
          <i className="fa-solid fa-star"></i>

          {`${rating} of 5.0`}
        </div>
      </div>

      <div className="kst-property-page-property-badge-image-and-available-date">
        <div className="kst-property-page-property-badge-image">
          <img src={images[currentImageIndex]} />
        </div>

        <div className="kst-property-page-property-badge-image-navigation">
          <div
            className="kst-property-page-property-badge-image-navigation-prev"
            onClick={(event) => {
              event.preventDefault();

              setCurrentImageIndex((currentIndex) => {
                return currentIndex - 1 < 0
                  ? images.length - 1
                  : currentIndex - 1;
              });
            }}
          >
            {"<"}
          </div>

          <div
            className="kst-property-page-property-badge-image-navigation-next"
            onClick={(event) => {
              event.preventDefault();

              setCurrentImageIndex((currentIndex) => {
                return currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
              });
            }}
          >
            {">"}
          </div>
        </div>

        <div className="kst-property-page-property-badge-available-date">{`Available ${available}`}</div>
      </div>

      <div className="kst-property-page-price-and-rooms">
        <div className="kst-property-page-price">{price}</div>

        <div className="kst-property-page-rooms">
          <div className="kst-property-page-room">
            <div className="kst-property-page-room-category">{"Guests"}</div>

            <div className="kst-property-page-room-number">
              {numberOfGuests}
            </div>
          </div>

          <div className="kst-property-page-room">
            <div className="kst-property-page-room-category">{"Beds"}</div>

            <div className="kst-property-page-room-number">{numberOfBeds}</div>
          </div>

          <div className="kst-property-page-room">
            <div className="kst-property-page-room-category">{"Baths"}</div>

            <div className="kst-property-page-room-number">{numberOfBaths}</div>
          </div>

          <div className="kst-property-page-room">
            <div className="kst-property-page-room-category">
              {"Workstations"}
            </div>

            <div className="kst-property-page-room-number">
              {numberOfOffices}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
