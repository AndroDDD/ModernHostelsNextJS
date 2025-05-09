"use client";
import { useState } from "react";
import Image from "next/image";

import "@/app/ui/styles/scss/components/list-property/sections/properties-slide-section.scss";
import { PropertiesSlideSection } from "@/app/types/listPropertyPageData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";

export default ({ properties }: PropertiesSlideSection) => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState<number>(0);

  return (
    properties &&
    properties.length > 0 && (
      <section id="kst-list-property-page-properties-slide-section">
        {properties && properties.length > 0 ? (
          <>
            <div className="kst-list-property-page-properties-slide-section-content">
              <div className="kst-list-property-page-properties-slide-section-content-text">
                <div className="kst-list-property-page-properties-slide-section-content-title">
                  {properties[currentPropertyIndex].name}
                </div>

                <div className="kst-list-property-page-properties-slide-section-content-image">
                  <Image
                    src={properties[currentPropertyIndex].imgUrl}
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>

                <div className="kst-list-property-page-properties-slide-section-content-stats">
                  {properties[currentPropertyIndex].stats.length > 0 ? (
                    properties[currentPropertyIndex].stats.map((stat) => (
                      <div className="kst-list-property-page-properties-slide-section-content-stat">
                        <div className="kst-list-property-page-properties-slide-section-content-stat-number">
                          {stat.number}
                        </div>

                        <div className="kst-list-property-page-properties-slide-section-content-stat-name">
                          {stat.name}
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>

                <div className="kst-list-property-page-properties-slide-section-content-review">
                  <div className="kst-list-property-page-properties-slide-section-content-review-statement">
                    {properties[currentPropertyIndex].review.statement}
                  </div>

                  <div className="kst-list-property-page-properties-slide-section-content-review-from-date">
                    {`${properties[currentPropertyIndex].review.from} - ${properties[currentPropertyIndex].review.date}`}
                  </div>
                </div>
              </div>

              <div className="kst-list-property-page-properties-slide-section-content-image">
                <Image
                  src={properties[currentPropertyIndex].imgUrl}
                  width={500}
                  height={500}
                  alt=""
                />
              </div>
            </div>

            <div className="kst-list-property-page-properties-slide-section-nav-bar">
              <div
                className="kst-list-property-page-properties-slide-section-nav-bar-prev"
                onClick={(event) => {
                  event.preventDefault();

                  setCurrentPropertyIndex((prevIndex) => {
                    const updatedIndex =
                      prevIndex - 1 < 0 ? properties.length - 1 : prevIndex - 1;

                    return updatedIndex;
                  });
                }}
              >
                {fetchSVGIcon("simpleLeftArrowWithCircleBorder")}
              </div>

              <div
                className="kst-list-property-page-properties-slide-section-nav-bar-next"
                onClick={(event) => {
                  event.preventDefault();

                  setCurrentPropertyIndex((prevIndex) => {
                    const updatedIndex =
                      prevIndex + 1 >= properties.length ? 0 : prevIndex + 1;

                    return updatedIndex;
                  });
                }}
              >
                {fetchSVGIcon("simpleRightArrowWithCircleBorder")}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    )
  );
};

export const isPropertiesSlideSectionRendered = ({
  properties,
}: PropertiesSlideSection) => {
  return properties && properties.length > 0;
};
