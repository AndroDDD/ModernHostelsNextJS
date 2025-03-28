"use client";
import React, { useEffect, useRef, useState } from "react";

import { OverviewSection } from "@/app/types/propertyPageData";
import { formatAvgPriceText } from "@/app/generalFunctions/formatAvgPriceText";
import OverviewInfoLayout from "@/app/ui/property/subComponents/overviewInfoLayout";
import BookNowForm from "@/app/ui/sharedComponents/bookNowForm";
import "@/app/ui/styles/scss/components/property/sections/overview-section.scss";

export default (overviewInfo: OverviewSection & { isMobile: boolean }) => {
  const bookNowFormContainerRef = useRef<HTMLDivElement>(null);
  const bookNowFormExpandFormContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<string>(
    overviewInfo.isMobile ? "mobile" : "desktop"
  );

  useEffect(() => {
    const detectScreenResize = (event: any) => {
      if (event.currentTarget.innerWidth <= 768) {
        setWindowWidth("mobile");
      } else {
        setWindowWidth("desktop");
      }
    };

    window.addEventListener("resize", detectScreenResize);

    const bookNowForm = bookNowFormContainerRef.current
      ?.firstChild as HTMLDivElement;
    const bookNowFormCloseButton = bookNowForm.firstChild as HTMLDivElement;

    if (windowWidth === "mobile") {
      if (bookNowFormContainerRef.current) {
        bookNowFormContainerRef.current.style.position = "fixed";
        bookNowFormContainerRef.current.style.bottom = "0";
        bookNowFormContainerRef.current.style.left = "0";
        bookNowFormContainerRef.current.style.display = "flex";
        bookNowFormContainerRef.current.style.width = "100%";
      }
      bookNowForm.style.display = "none";
      bookNowForm.style.position = "absolute";
      bookNowForm.style.top = "3%";
      bookNowForm.style.left = "3%";
      bookNowForm.style.height = "calc(100% - 6%)";
      bookNowForm.style.width = "calc(100% - 6%)";
      bookNowFormCloseButton.style.display = "flex";

      if (bookNowFormExpandFormContainerRef.current) {
        bookNowFormExpandFormContainerRef.current.style.display = "flex";
      }
    } else if (windowWidth === "desktop") {
      if (bookNowFormContainerRef.current) {
        bookNowFormContainerRef.current.style.position = "static";
        bookNowFormContainerRef.current.style.display = "block";
        bookNowFormContainerRef.current.style.width = "40%";
        bookNowFormContainerRef.current.style.background = "none";
      }

      bookNowForm.style.display = "flex";
      bookNowForm.style.position = "sticky";
      bookNowForm.style.top = "100px";
      bookNowForm.style.left = "unset";
      bookNowForm.style.height = "unset";
      bookNowForm.style.width = "unset";
      bookNowFormCloseButton.style.display = "none";

      if (bookNowFormExpandFormContainerRef.current) {
        bookNowFormExpandFormContainerRef.current.style.display = "none";
      }
    }

    return () => {
      window.removeEventListener("resize", detectScreenResize);
    };
  }, [windowWidth]);

  return (
    <section id="kst-property-page-overview-section">
      <div className="kst-property-page-overview-section-info">
        <OverviewInfoLayout {...overviewInfo} />
      </div>

      <div
        ref={bookNowFormContainerRef}
        className="kst-property-page-overview-section-book-now"
      >
        <BookNowForm
          headerText="Select <strong>check-in</strong> and <strong>check-out</strong> dates to see the price of this property."
          discountText="<strong>Save 10%</strong> by booking for a week, or <strong>save 20%</strong> by booking for a month at this property."
          propertyPageSlug={overviewInfo.propertyPageSlug}
          propertyName={overviewInfo.propertyName}
          propertyImageUrl={overviewInfo.propertyImageUrl}
          numberOfBeds={overviewInfo.numberOfBeds}
          numberOfBaths={overviewInfo.numberOfBaths}
          bookNowFormExpandFormContainerRef={bookNowFormExpandFormContainerRef}
          calendarSpaces={overviewInfo.spaces}
        />

        <div
          ref={bookNowFormExpandFormContainerRef}
          className="kst-book-now-form-expand-form-container"
        >
          <div className="kst-book-now-form-expand-form-container-avg-price">
            {formatAvgPriceText(overviewInfo.propertyPrice).map(
              (priceText, index) =>
                index === 0 ? (
                  <div
                    key={`kst-book-now-form-expand-form-container-avg-price-${index}`}
                    className="kst-book-now-form-expand-form-container-avg-price-header"
                  >
                    {`Avg. Price / ${priceText}`}
                  </div>
                ) : (
                  <div
                    key={`kst-book-now-form-expand-form-container-avg-price-${index}`}
                    className="kst-book-now-form-expand-form-container-avg-price-number"
                  >
                    {`$${priceText}`}
                  </div>
                )
            )}
          </div>

          <div
            className="kst-book-now-form-expand-form-container-button"
            onClick={(event) => {
              const bookNowForm = bookNowFormContainerRef.current
                ?.firstChild as HTMLDivElement;

              if (bookNowFormContainerRef.current) {
                bookNowFormContainerRef.current.style.background =
                  "rgba(0,0,0,.8)";
                bookNowFormContainerRef.current.style.height = "100%";
                bookNowFormContainerRef.current.style.zIndex = "1000";
                bookNowForm.style.display = "flex";
              }

              if (bookNowFormExpandFormContainerRef.current) {
                bookNowFormExpandFormContainerRef.current.style.display =
                  "none";
              }
            }}
          >
            {"Book Now"}
          </div>
        </div>
      </div>
    </section>
  );
};
