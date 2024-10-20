"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { PropertyData } from "@/app/types/propertyData";
import "@/app/ui/styles/scss/components/shared-components/property-badge.scss";

type TPropertyBadge = {
  property: PropertyData;
};

export default ({ property }: TPropertyBadge) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  return (
    <div className="kst-property-badge">
      <div className="kst-property-badge-images-container">
        {property.images ? (
          <Link
            href={`/property/${property.pageSlug}`}
            className="kst-property-badge-image"
          >
            <Image
              src={property.images[selectedImageIndex]}
              width={500}
              height={500}
              alt=""
            />
          </Link>
        ) : (
          <></>
        )}

        <div className="kst-property-badge-images-navigation">
          {property.images ? (
            <>
              <div
                className="kst-property-badge-images-navigation-prev"
                onClick={(event) => {
                  event.preventDefault();

                  setSelectedImageIndex((currentImageIndex) => {
                    const nextImageIndex =
                      currentImageIndex + 1 >= property.images.length
                        ? 0
                        : currentImageIndex + 1;

                    return nextImageIndex;
                  });
                }}
              >
                {"<"}
              </div>

              <div
                className="kst-property-badge-images-navigation-next"
                onClick={(event) => {
                  event.preventDefault();

                  setSelectedImageIndex((currentImageIndex) => {
                    const prevImageIndex =
                      currentImageIndex - 1 < 0
                        ? property.images.length - 1
                        : currentImageIndex - 1;

                    return prevImageIndex;
                  });
                }}
              >
                {">"}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Link
        href={`/property/${property.pageSlug}`}
        className="kst-property-badge-info"
      >
        <div className="kst-property-badge-info-left">
          <div className="kst-property-badge-info-left-name">
            {property.propertyName}
          </div>

          <div className="kst-property-badge-info-left-price">
            {property.price}
          </div>
        </div>

        <div className="kst-property-badge-info-right">
          {property.numberOfBeds > 0 ? (
            <div className="kst-property-badge-info-beds">
              <div className="kst-property-badge-info-beds-title">{"Beds"}</div>

              <div className="kst-property-badge-info-beds-quantity">
                {property.numberOfBeds}
              </div>
            </div>
          ) : (
            <></>
          )}

          {property.numberOfBaths > 0 ? (
            <div className="kst-property-badge-info-baths">
              <div className="kst-property-badge-info-baths-title">
                {"Baths"}
              </div>

              <div className="kst-property-badge-info-baths-quantity">
                {property.numberOfBaths}
              </div>
            </div>
          ) : (
            <></>
          )}

          {property.numberOfOffices > 0 ? (
            <div className="kst-property-badge-info-offices">
              <div className="kst-property-badge-info-offices-title">
                {"Offices"}
              </div>

              <div className="kst-property-badge-info-offices-quantity">
                {property.numberOfOffices}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Link>

      <div className="kst-property-badge-available-date">
        {`${property.dateLabel ?? "Available"} ${property.available}`}
      </div>
    </div>
  );
};
