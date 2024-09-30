"use client";

import { renderToStaticMarkup } from "react-dom/server";

import { updatePropertyRatings } from "@/app/generalFunctions/apiDataFetches/dashboard/functions";
import "@/app/ui/styles/scss/components/dashboard/sub-components/order-details.scss";

type OrderDetailsInterface = {
  property_slug: string;
  user_id: string;
  order_id: string;
  order_date: string;
  start_date: string;
  end_date: string;
  price_totals: any;
  ratings: {
    [key: string]:
      | {
          rating_date: string;
          rating: number;
        }
      | undefined;
    accuracy_rating?: {
      rating_date: string;
      rating: number;
    };
    location_rating?: {
      rating_date: string;
      rating: number;
    };
    cleanliness_rating?: {
      rating_date: string;
      rating: number;
    };
    support_rating?: {
      rating_date: string;
      rating: number;
    };
    check_in_rating?: {
      rating_date: string;
      rating: number;
    };
    value_rating?: {
      rating_date: string;
      rating: number;
    };
  };
};

export default function OrderDetails({
  property_slug,
  user_id,
  order_id,
  order_date,
  start_date,
  end_date,
  price_totals,
  ratings,
}: OrderDetailsInterface) {
  const ratingLabels = [
    "Accuracy Rating",
    "Location Rating",
    "Cleanliness Rating",
    "Support Rating",
    "Check In Rating",
    "Value Rating",
  ];

  const generateStarsForAverageRating = (
    ratings: {
      [key: string]: any;
      rating: number;
    }[]
  ): JSX.Element[] => {
    const numberOfRatings = ratings.length;
    let totalRating = 0;
    let starEls: JSX.Element[] = [];

    for (let rating of ratings) {
      totalRating += rating.rating;
    }
    const averageRating = totalRating / numberOfRatings;
    const fullStars = Math.round(averageRating);

    for (let i = 0; i < fullStars; i++) {
      starEls.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{ color: "goldenrod" }}
        ></i>
      );
    }

    return starEls;
  };

  return (
    <div className={`kst-dashboard-booking-order-details-section`}>
      <div className={`kst-dashboard-compact-container`}>
        <div className={`kst-dashboard-compact-container-item`}>
          <span>Order Id:</span> {order_id}
        </div>

        <div className={`kst-dashboard-compact-container-item`}>
          <span>Order Date:</span> {order_date}
        </div>
      </div>

      <div className={`kst-dashboard-compact-container no-wrap`}>
        <div className={`kst-dashboard-compact-container-item`}>
          <span>Start Date:</span> {start_date}
        </div>

        <div className={`kst-dashboard-compact-container-item`}>
          <span>End Date:</span> {end_date}
        </div>
      </div>

      <div className={`kst-dashboard-compact-container`}>
        <div className={`kst-dashboard-compact-container-item`}>
          <span
            className="kst-dashboard-toggle-button"
            onClick={(e) => {
              const ratings_container = e.currentTarget.parentElement
                ?.children[2] as HTMLDivElement;

              if (ratings_container) {
                const currentDisplay = ratings_container.style.display;

                if (currentDisplay === "none" || currentDisplay === "") {
                  ratings_container.style.display = "flex";
                } else {
                  ratings_container.style.display = "none";
                }
              }
            }}
          >
            Rating:
          </span>

          <div>
            {ratings
              ? generateStarsForAverageRating(
                  Object.values(ratings).filter(Boolean) as {
                    rating_date: string;
                    rating: number;
                  }[]
                )
              : "Not Yet Rated"}
          </div>

          <div className="kst-dashboard-compact-container-item-toggle-menu">
            {ratingLabels.map((ratingLabel) => (
              <div className="kst-dashboard-compact-container-item-toggle-menu-item">
                <div className="kst-dashboard-compact-container-item-toggle-menu-item-label">
                  {`${ratingLabel}:`}
                </div>

                <div className="kst-dashboard-compact-container-item-toggle-menu-item-value">
                  {["", "", "", "", ""].map((empty, index) => {
                    const ratingName = ratingLabel
                      .replace(/ /g, "_")
                      .toLowerCase();
                    const ratingData = ratings
                      ? ratings[ratingName]
                      : { rating: 0 };
                    const ratingValue = ratingData?.rating ?? 0;

                    const onClick = async (
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => {
                      const average_rating_el =
                        e.currentTarget.parentElement?.parentElement
                          ?.parentElement?.parentElement?.children[1];
                      const rating_stars_container = e.currentTarget
                        .parentElement as HTMLDivElement;
                      const rating_star_els = rating_stars_container.children;
                      const updatedRatingValue = index + 1;
                      const updatedRatings = {
                        [ratingName]: {
                          rater_id: user_id,
                          rating_id: order_id,
                          rating: updatedRatingValue,
                        },
                      };

                      const ratingsUpdateResponse = await updatePropertyRatings(
                        property_slug,
                        updatedRatings,
                        user_id,
                        order_id
                      );

                      for (
                        let starIndex = 0;
                        starIndex < rating_star_els.length;
                        starIndex++
                      ) {
                        rating_star_els[starIndex].classList.remove("rated");

                        if (starIndex + 1 <= updatedRatingValue) {
                          rating_star_els[starIndex].classList.add("rated");
                        }
                      }

                      if (average_rating_el) {
                        const user_ratings =
                          ratingsUpdateResponse["rater_ratings"];
                        const updatedAverageRatingEl = renderToStaticMarkup(
                          generateStarsForAverageRating(
                            Object.values(user_ratings).filter(Boolean) as {
                              rating_date: string;
                              rating: number;
                            }[]
                          )
                        );
                        average_rating_el.innerHTML = updatedAverageRatingEl;
                      }
                      console.log({ ratingsUpdateResponse });
                    };

                    return ratingData ? (
                      <div
                        key={`kst-dashboard-order-details-review-star-${ratingName}-${index}`}
                        className={`kst-dashboard-order-details-review-star${
                          index + 1 <= ratingValue ? " rated" : ""
                        }`}
                        onClick={onClick}
                      >
                        <i className="fa-solid fa-star"></i>
                      </div>
                    ) : (
                      <div
                        key={`kst-dashboard-order-details-review-star-${ratingName}-${index}`}
                        className={`kst-dashboard-order-details-review-star`}
                        onClick={onClick}
                      >
                        <i className="fa-solid fa-star"></i>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
