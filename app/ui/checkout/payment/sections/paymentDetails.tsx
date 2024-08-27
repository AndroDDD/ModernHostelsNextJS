"use client";
// @refresh reset
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { appId, locationId } from "@/app/constants/envReferences";
import { BookingDataForCookie } from "@/app/types/bookingDataForCookie";
import { retrieveBookingDataFromCookie } from "@/app/generalFunctions/retrieveBookingDataFromCookie";
import {
  submitPayment,
  payOrder,
} from "@/app/generalFunctions/checkout/actions";
import "@/app/ui/styles/scss/components/checkout/payment/sections/payment-details.scss";
import { sendEmail } from "@/app/generalFunctions/apiDataFetches/sendEmail";
import { updateWPCalendarData } from "@/app/generalFunctions/calendar/updateWPCalendarData";

export default function PaymentDetails() {
  const router = useRouter();

  const [bookingData, setBookingData] = useState<BookingDataForCookie>();

  useEffect(() => {
    const bookingData = retrieveBookingDataFromCookie();

    if (!bookingData) {
      redirect(`/`);
    }

    console.log(bookingData);

    setBookingData(bookingData);
  }, []);

  return (
    <section id="kst-checkout-payment-details-section">
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
                  {bookingData.spaces ? bookingData.spaces.baths : null}
                </div>

                <div className="kst-order-review-property-stat-name">
                  {"bath"}
                </div>
              </div>
            </div>
          </div>

          <div className="kst-payment-details-inputs">
            <PaymentForm
              applicationId={appId ?? ""}
              locationId={locationId ?? ""}
              cardTokenizeResponseReceived={async (token: any) => {
                const paymentResult = await submitPayment(
                  token.token,
                  bookingData.orderData.order.id,
                  Number(bookingData.orderData.order.totalMoney.amount)
                );

                console.log({ paymentResult });

                if (paymentResult.errors) {
                  const errorElementDisplay = document.createElement("div");
                  errorElementDisplay.innerHTML =
                    "Payment Failed To Process.<br />Ensure Card Details Are Correct.";
                  errorElementDisplay.classList.add(
                    "kst-payment-error-message"
                  );

                  const paymentInputsElement = document.getElementsByClassName(
                    "kst-payment-details-inputs"
                  )[0] as HTMLDivElement;
                  paymentInputsElement.appendChild(errorElementDisplay);

                  setTimeout(() => {
                    errorElementDisplay.remove();
                  }, 6000);
                } else {
                  console.log({
                    orderVersionBeforePaymentSubmission:
                      bookingData.orderData.order.version,
                  });
                  const orderResult = await payOrder(
                    paymentResult.payment.id,
                    bookingData.orderData.order.id,
                    bookingData.orderData.order.version + 1
                  );
                  console.log({ orderResult });

                  if (typeof orderResult === "string") {
                    console.log({ orderResult });
                    alert(orderResult);
                    return;
                  } else {
                    const confirmationNumber = orderResult.order.id;
                    const propertySlug = bookingData.propertyName
                      .replace(/ /g, "-")
                      .toLowerCase();

                    await updateWPCalendarData(
                      propertySlug,
                      bookingData.dates.checkIn,
                      bookingData.dates.checkOut,
                      bookingData.calendarSpaceId ?? null
                    );

                    const emailData = {
                      full_name: bookingData.contact?.name,
                      reply_to: bookingData.contact?.email,
                      property: bookingData.propertyName,
                      start_date: bookingData.dates.checkIn,
                      end_date: bookingData.dates.checkOut,
                      order_id: confirmationNumber,
                    };
                    const emailServer = 2;
                    const emailSentSuccessfully = await sendEmail({
                      data: emailData,
                      emailServer,
                    });

                    if (emailSentSuccessfully) {
                      console.log("Email sent successfully!");
                    } else {
                      console.log("Failed to send email!");
                    }

                    const thankYouData = JSON.stringify({
                      emailSentSuccessfully,
                      confirmationNumber,
                    });

                    document.cookie = `bookingData=; path=/; domain=${window.location.hostname}; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
                    document.cookie = `thankYouData=${thankYouData}; path=/; domain=${window.location.hostname}`;
                    router.push("/checkout/thank-you");
                  }
                }
              }}
              formProps={{
                className: "kst-payment-details-form-props",
              }}
            >
              <CreditCard />
            </PaymentForm>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
