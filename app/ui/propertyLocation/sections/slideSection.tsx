"use client";

import { useState, useEffect, useRef } from "react";

import { SlideSectionParameters } from "@/app/types/locationPageData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import "@/app/ui/styles/scss/components/property-location/sections/slide-section.scss";

export default ({ title, slides }: SlideSectionParameters) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const titleSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleSummaryRef.current) {
      let contentTitleElement = titleSummaryRef.current
        .children[0] as HTMLDivElement;
      let contentTitleElementHeight = contentTitleElement.offsetHeight;
      let contentSummaryElement = titleSummaryRef.current
        .children[1] as HTMLDivElement;
      let contentSummaryElementHeightCSS = `calc(100% - ${contentTitleElementHeight}px)`;

      contentSummaryElement.style.height = contentSummaryElementHeightCSS;
    }
  }, [currentSlideIndex]);

  return title && slides.length > 0 ? (
    <section className="kst-property-location-slide-section">
      <div className="kst-property-location-slide-section-header">{title}</div>

      <div className="kst-property-location-slide-section-content">
        <div className="kst-property-location-slide-section-content-image">
          <img
            src={
              slides[currentSlideIndex].imgUrl
                ? slides[currentSlideIndex].imgUrl
                : ""
            }
          />
        </div>

        <div
          ref={titleSummaryRef}
          className="kst-property-location-slide-section-content-title-summary"
        >
          <div className="kst-property-location-slide-section-content-title">
            {slides[currentSlideIndex].title}
          </div>

          <div className="kst-property-location-slide-section-content-summary">
            <p>{slides[currentSlideIndex].summary}</p>
          </div>
        </div>

        <div className="kst-property-location-slide-section-content-navigation">
          <div className="kst-property-location-slide-section-content-navigation-index-tracker">
            <span>{`${currentSlideIndex + 1}`}</span>

            {`/${slides.length}`}
          </div>

          <div
            className="kst-property-location-slide-section-content-navigation-prev"
            onClick={(event) => {
              event.preventDefault();

              setCurrentSlideIndex((index) => {
                const prevIndex = index - 1 < 0 ? slides.length - 1 : index - 1;

                return prevIndex;
              });
            }}
          >
            {fetchSVGIcon("leftArrow")}
          </div>

          <div
            className="kst-property-location-slide-section-content-navigation-next"
            onClick={(event) => {
              event.preventDefault();

              setCurrentSlideIndex((index) => {
                const nextIndex = index + 1 >= slides.length ? 0 : index + 1;

                return nextIndex;
              });
            }}
          >
            {fetchSVGIcon("rightArrow")}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};
