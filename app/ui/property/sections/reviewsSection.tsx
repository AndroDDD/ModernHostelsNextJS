"use client";

import { ReviewsSection } from "@/app/types/propertyPageData";
import "@/app/ui/styles/scss/components/property/sections/reviews-section.scss";
import ReviewStars from "@/app/ui/sharedComponents/reviewStars";
import TestimonialBadge from "@/app/ui/property/subComponents/testimonialBadge";

export default ({
  numberOfReviews,
  numberOfStars,
  otherStats,
  testimonials,
}: ReviewsSection) => {
  const areOtherStatsStarsAllZeros = (
    otherStats: {
      statName: string;
      numberOfStars: number;
    }[]
  ) => {
    return otherStats.every((stat) => stat.numberOfStars === 0);
  };

  return (
    <section
      id="kst-property-page-reviews-section"
      style={
        numberOfReviews === 0 &&
        numberOfStars === 0 &&
        areOtherStatsStarsAllZeros(otherStats) &&
        testimonials.length === 0
          ? { display: "none" }
          : {}
      }
    >
      <div className="kst-property-page-reviews-section-header">
        <div
          className="kst-property-page-reviews-section-header-number-of-reviews"
          style={
            !numberOfReviews || numberOfReviews < 1 ? { display: "none" } : {}
          }
        >
          {`${numberOfReviews} Reviews`}
        </div>

        <div
          className="kst-property-page-reviews-section-header-number-of-stars"
          style={!numberOfStars || numberOfStars < 1 ? { display: "none" } : {}}
        >
          <div className="kst-property-page-reviews-section-header-number-of-stars-graphics">
            <ReviewStars numberOfStars={numberOfStars} />
          </div>

          <div className="kst-property-page-reviews-section-header-number-of-stars-text">
            {`${numberOfStars} stars`}
          </div>
        </div>
      </div>

      <div
        className="kst-property-page-reviews-section-other-stats"
        style={otherStats.length === 0 ? { display: "none" } : {}}
      >
        {otherStats ? (
          otherStats.map((otherStat, otherStatIndex) =>
            otherStat.numberOfStars > 0 ? (
              <div
                key={`kst-property-page-reviews-section-other-stat-${otherStatIndex}`}
                className="kst-property-page-reviews-section-other-stat"
              >
                <div className="kst-property-page-reviews-section-other-stat-name">
                  {otherStat.statName}
                </div>

                <div className="kst-property-page-reviews-section-other-stat-stars">
                  <ReviewStars numberOfStars={otherStat.numberOfStars} />
                </div>
              </div>
            ) : (
              <div
                key={`kst-property-page-reviews-section-other-stat-${otherStatIndex}`}
              ></div>
            )
          )
        ) : (
          <></>
        )}
      </div>

      <div
        className="kst-property-page-reviews-section-testimonials"
        style={testimonials.length === 0 ? { display: "none" } : {}}
      >
        <div className="kst-property-page-reviews-section-testimonials-first-three">
          {testimonials.slice(0, 3).map((testimonial, testimonialIndex) => (
            <TestimonialBadge
              key={`kst-property-page-reviews-section-testimonial-badge-1-${testimonialIndex}`}
              from={testimonial.from}
              date={testimonial.date}
              review={testimonial.review}
            />
          ))}
        </div>

        <div className="kst-property-page-reviews-section-testimonials-expanded">
          {testimonials.length > 3 ? (
            testimonials
              .slice(3)
              .map((testimonial, testimonialIndex) => (
                <TestimonialBadge
                  key={`kst-property-page-reviews-section-testimonial-badge-2-${testimonialIndex}`}
                  from={testimonial.from}
                  date={testimonial.date}
                  review={testimonial.review}
                />
              ))
          ) : (
            <></>
          )}
        </div>

        <div
          className="kst-property-page-reviews-section-testimonials-expand-hide-link"
          role="button"
          onClick={(event) => {
            event.preventDefault();

            const linkText = event.currentTarget.innerText;

            let expandedTestimonialsContainerElement = event.currentTarget
              .parentElement?.children[1] as HTMLDivElement;

            if (linkText === "View all reviews") {
              expandedTestimonialsContainerElement.style.display = "flex";
              event.currentTarget.innerText = "Hide all reviews";
            } else if (linkText === "Hide all reviews") {
              expandedTestimonialsContainerElement.style.display = "none";
              event.currentTarget.innerText = "View all reviews";
            }
          }}
        >
          {"View all reviews"}
        </div>
      </div>
    </section>
  );
};
