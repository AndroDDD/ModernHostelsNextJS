"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

import { BookingDataForCookie } from "@/app/types/bookingDataForCookie";
import { retrieveBookingDataFromCookie } from "@/app/generalFunctions/retrieveBookingDataFromCookie";
import { formatDateDisplay } from "@/app/generalFunctions/formatDate";
import "@/app/ui/styles/scss/components/checkout/order-review/sections/order-review.scss";
import { createOrder } from "@/app/generalFunctions/checkout/actions";

export default function OrderReview() {
  const { user } = useUser();
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingDataForCookie>();

  useEffect(() => {
    const bookingData = retrieveBookingDataFromCookie();
    console.log({ MHOrderReviewPageBookingData: bookingData });

    if (!bookingData) {
      redirect(`/`);
    }

    setBookingData({
      ...bookingData,
      contact: {
        name: user?.name ?? "",
        email: user?.email ?? "",
      },
    });
  }, []);

  return (
    <section id="kst-checkout-order-review-section">
      {bookingData ? (
        <>
          <div className="kst-order-review-property-details">
            <div className="kst-order-review-property-image">
              <img src={bookingData.propertyImageUrl} />
            </div>

            <div className="kst-order-review-property-stats">
              <div className="kst-order-review-property-name">
                {bookingData.propertyName}
              </div>

              <div className="kst-order-review-property-stat">
                <div className="kst-order-review-property-stat-number">
                  {bookingData.spaces.beds}
                </div>

                <div className="kst-order-review-property-stat-name">
                  {"bed"}
                </div>
              </div>

              <div className="kst-dot">{"•"}</div>
              <div className="kst-order-review-property-stat">
                <div className="kst-order-review-property-stat-number">
                  {bookingData.spaces.baths}
                </div>

                <div className="kst-order-review-property-stat-name">
                  {"bath"}
                </div>
              </div>
            </div>
          </div>

          <div className="kst-order-review-order-details">
            <div className="kst-order-review-order-dates">
              <div className="kst-order-review-order-date">
                <div className="kst-order-review-order-date-header">
                  {"Check-In"}
                </div>
                <div className="kst-order-review-order-date-time">
                  {formatDateDisplay(bookingData.dates.checkIn)}
                </div>
              </div>

              <div>{">"}</div>

              <div className="kst-order-review-order-date">
                <div className="kst-order-review-order-date-header">
                  {"Check-Out"}
                </div>
                <div className="kst-order-review-order-date-time">
                  {formatDateDisplay(bookingData.dates.checkOut)}
                </div>
              </div>
            </div>

            <div className="kst-book-now-form-totals">
              <div className="kst-book-now-form-totals-subtotal">
                <div className="kst-book-now-form-totals-subtotal-label">
                  {"Subtotal"}
                </div>

                <div className="kst-book-now-form-totals-subtotal-number">
                  {`$${bookingData.priceTotals.subTotal}`}
                </div>
              </div>

              <div className="kst-book-now-form-totals-taxes-fees">
                <div
                  className="kst-book-now-form-totals-taxes-fees-label"
                  onClick={(event) => {
                    event.preventDefault();

                    const taxesFeesExpandedElement = event.currentTarget
                      .parentElement?.parentElement
                      ?.children[2] as HTMLDivElement;
                    const taxesFeesToggleElement = event.currentTarget
                      .children[1] as HTMLDivElement;
                    const styleDisplay = taxesFeesExpandedElement.style.display;

                    if (styleDisplay === "none") {
                      taxesFeesExpandedElement.style.display = "flex";
                      taxesFeesToggleElement.style.transform = "rotate(0deg)";
                    } else {
                      taxesFeesExpandedElement.style.display = "none";
                      taxesFeesToggleElement.style.transform = "rotate(-90deg)";
                    }
                  }}
                >
                  <div className="kst-book-now-form-totals-taxes-fees-label-text">
                    {"Taxes & Fees"}
                  </div>

                  <div className="kst-book-now-form-totals-taxes-fees-label-toggle">
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>

                <div className="kst-book-now-form-totals-taxes-fees-number">
                  {`$${bookingData.priceTotals.taxesFeesCombined}`}
                </div>
              </div>

              <div
                className="kst-book-now-form-totals-taxes-fees-expanded"
                style={{ display: "none" }}
              >
                {bookingData.priceTotals.fees.pet ? (
                  <div className="kst-book-now-form-totals-taxes-fees-expanded-item">
                    <div className="kst-book-now-form-totals-taxes-fees-expanded-item-label">
                      {"Pet fee"}
                    </div>

                    <div className="kst-book-now-form-totals-taxes-fees-expanded-item-number">
                      {`$${bookingData.priceTotals.fees.pet}`}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="kst-book-now-form-totals-taxes-fees-expanded-item">
                  <div className="kst-book-now-form-totals-taxes-fees-expanded-item-label">
                    {"Cleaning fee"}
                  </div>

                  <div className="kst-book-now-form-totals-taxes-fees-expanded-item-number">
                    {`$${bookingData.priceTotals.fees.cleaning}`}
                  </div>
                </div>

                <div className="kst-book-now-form-totals-taxes-fees-expanded-item">
                  <div className="kst-book-now-form-totals-taxes-fees-expanded-item-label">
                    {"Service fee"}
                  </div>

                  <div className="kst-book-now-form-totals-taxes-fees-expanded-item-number">
                    {`$${bookingData.priceTotals.fees.service}`}
                  </div>
                </div>

                <div className="kst-book-now-form-totals-taxes-fees-expanded-item">
                  <div className="kst-book-now-form-totals-taxes-fees-expanded-item-label">
                    {"Taxes"}
                  </div>

                  <div className="kst-book-now-form-totals-taxes-fees-expanded-item-number">
                    {`$${bookingData.priceTotals.taxes}`}
                  </div>
                </div>
              </div>

              <div className="kst-book-now-form-totals-due">
                <div className="kst-book-now-form-totals-due-label">
                  {"Total Due"}
                </div>

                <div className="kst-book-now-form-totals-due-number">
                  {`$${bookingData.priceTotals.totalDue}`}
                </div>
              </div>
            </div>
          </div>

          <div className="kst-order-review-contact-details">
            <div className="kst-order-review-contact-input">
              <label>NAME:</label>

              <input
                type="text"
                required
                defaultValue={user?.name ?? ""}
                onInput={(e) => {
                  e.preventDefault();

                  setBookingData((prevBookingData) => {
                    console.log({ prevBookingData });
                    if (prevBookingData)
                      return {
                        ...prevBookingData,
                        contact: {
                          name: (e.target as HTMLInputElement).value,
                          email: prevBookingData?.contact
                            ? prevBookingData.contact.email
                            : "",
                        },
                      };
                  });
                }}
              ></input>
            </div>

            <div className="kst-order-review-contact-input">
              <label>EMAIL:</label>

              <input
                type="email"
                required
                defaultValue={user?.email ?? ""}
                onInput={(e) => {
                  e.preventDefault();

                  setBookingData((prevBookingData) => {
                    console.log({ prevBookingData });
                    if (prevBookingData)
                      return {
                        ...prevBookingData,
                        contact: {
                          email: (e.target as HTMLInputElement).value,
                          name: prevBookingData?.contact
                            ? prevBookingData.contact.name
                            : "Traveling Guest",
                        },
                      };
                  });
                }}
              ></input>
            </div>
          </div>

          <div
            className="kst-order-review-payment-button"
            onClick={async (e) => {
              e.preventDefault();
              const rentalAmount = Number(
                bookingData.priceTotals.totalDue
                  .replace(/,/g, "")
                  .replace(/\./g, "")
              );
              console.log({
                rentalAmount,
                originalAmount: bookingData.priceTotals.subTotal,
              });
              const rentalItem = {
                quantity: "1",
                basePriceMoney: {
                  amount: rentalAmount,
                  currency: "USD",
                },
                name: bookingData.propertyName,
                note: "Booking Order For Modern Hostels",
              };
              const orderData = await createOrder([rentalItem]);

              if (orderData.errors) {
                console.error(orderData.errors);
              } else {
                const updatedBookingData = { ...bookingData, orderData };
                const bookingDataCookie = JSON.stringify(updatedBookingData);

                document.cookie = `bookingData=${bookingDataCookie}; path=/; domain=${window.location.hostname}`;

                router.push(`/checkout/secured-payment`);
              }
            }}
          >
            {"SECURED PAYMENT"}
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
