"use client";
// @refresh reset
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

import { appId, locationId } from "@/app/constants/envReferences";
import { BookingDataForCookie } from "@/app/types/bookingDataForCookie";
import { retrieveBookingDataFromCookie } from "@/app/generalFunctions/retrieveBookingDataFromCookie";
import {
  submitPayment,
  payOrder,
} from "@/app/generalFunctions/checkout/actions";
import "@/app/ui/styles/scss/components/checkout/payment/sections/payment-details.scss";

export default function PaymentDetails() {
  const router = useRouter();

  const [bookingData, setBookingData] = useState<BookingDataForCookie>();

  useEffect(() => {
    const bookingData = retrieveBookingDataFromCookie();

    if (!bookingData) {
      redirect(`/`);
    }

    console.log({ bookingData, PaymentForm });

    setBookingData(bookingData);
  }, []);

  return (
    <section id="kst-checkout-payment-details-section">
      {bookingData ? (
        <>
          <div className="kst-order-review-property-details">
            <div className="kst-order-review-property-image">
              <Image
                src={bookingData.propertyImageUrl}
                width={500}
                height={500}
                alt=""
              />
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
                  const orderResult = await payOrder(
                    paymentResult.payment.id,
                    bookingData.orderData.order.id,
                    bookingData.orderData.order.version + 1
                  );

                  if (typeof orderResult === "string") {
                    console.log({ orderResult });

                    const errorElementDisplay = document.createElement("div");
                    errorElementDisplay.innerHTML = orderResult;
                    errorElementDisplay.classList.add(
                      "kst-payment-error-message"
                    );

                    const paymentInputsElement =
                      document.getElementsByClassName(
                        "kst-payment-details-inputs"
                      )[0] as HTMLDivElement;
                    paymentInputsElement.appendChild(errorElementDisplay);

                    setTimeout(() => {
                      errorElementDisplay.remove();
                    }, 10000);
                    return;
                  } else {
                    const thankYouData = JSON.stringify({
                      bookingData,
                      confirmationNumber: orderResult.order.id,
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
