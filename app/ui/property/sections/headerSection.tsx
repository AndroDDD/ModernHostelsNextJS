"use client";

import { HeaderSection } from "@/app/types/propertyPageData";
import ReviewStars from "@/app/ui/sharedComponents/reviewStars";
import "@/app/ui/styles/scss/components/property/sections/header-section.scss";

export default ({ title, summary, link }: HeaderSection) => {
  return (
    <section className="kst-property-page-header-section">
      {title.length > 0 ? (
        <div className="kst-property-page-header-section-title">{title}</div>
      ) : (
        <></>
      )}

      <div className="kst-property-page-header-section-summary">
        {summary.map((stat, index) => {
          if (index === 0) {
            const statTyped = stat as {
              numberOfReviews: number;
              numberOfStars: number;
            };
            const numberOfStarsRounded = Math.round(statTyped.numberOfStars);

            return numberOfStarsRounded > 0 ? (
              <div
                key={`kst-property-stat-${index}`}
                className="kst-property-page-header-section-summary-stat-first"
                role="button"
                onClick={(event) => {
                  event.preventDefault();

                  document
                    .getElementById("kst-property-page-reviews-section")
                    ?.scrollIntoView();
                }}
              >
                <div className="kst-property-page-header-section-summary-stat-first-stars">
                  <ReviewStars numberOfStars={numberOfStarsRounded} />
                </div>

                <div className="kst-property-page-header-section-summary-stat-first-subject">
                  {`${statTyped.numberOfReviews} reviews`}
                </div>
              </div>
            ) : (
              <></>
            );
          } else {
            const statTyped = stat as { statName: string; statNumber: number };

            return statTyped.statNumber > 0 ? (
              <div
                key={`kst-property-stat-${index}`}
                className="kst-property-page-header-section-summary-stat"
              >
                <div className="kst-property-page-header-section-summary-stat-number">
                  {statTyped.statNumber}
                </div>

                <div
                  className="kst-property-page-header-section-summary-stat-name"
                  style={
                    index === summary.length - 1
                      ? { borderRightWidth: "0px" }
                      : {}
                  }
                >
                  {statTyped.statName}
                </div>
              </div>
            ) : (
              <></>
            );
          }
        })}

        <div
          className="kst-property-page-header-section-summary-link"
          onClick={(event) => {
            event.preventDefault();

            document
              .getElementById("kst-property-page-the-neighborhood-section")
              ?.scrollIntoView();
          }}
        >
          {link.text}
        </div>
      </div>
    </section>
  );
};
