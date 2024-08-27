"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  BookNowFormParameters,
  BookNowFormSendData,
  PriceTotalsDisplay,
} from "@/app/types/bookNowFormData";
import { months } from "@/app/constants/months";
import { fetchPropertyCalenderDataByDateRange } from "@/app/generalFunctions/apiDataFetches/fetchPropertyCalendarData";
import { fetchSVGIcon } from "@/app/generalFunctions/fetchSVGIcon";
import PropertyCheckInOutCalendar from "@/app/ui/sharedComponents/calendar/propertyCheckInOutCalendar";
import "@/app/ui/styles/scss/components/shared-components/book-now-form.scss";
import { FilterBarData } from "@/app/types/mapPageData";
import { formatPriceText } from "@/app/generalFunctions/formatPriceText";
import { fetchPropertyPriceData } from "@/app/generalFunctions/apiDataFetches/fetchPropertyPriceData";

export default ({
  headerText,
  discountText,
  propertyPageSlug,
  propertyName,
  propertyImageUrl,
  numberOfBeds,
  numberOfBaths,
  bookNowFormExpandFormContainerRef,
  calendarSpaces,
}: BookNowFormParameters) => {
  const [formSendData, setFormSendData] = useState<
    BookNowFormSendData | FilterBarData
  >({
    dates: {
      checkIn: "",
      checkOut: "",
    },
    hasPet: false,
  });
  const router = useRouter();
  const [formattedDateDisplayText, setFormattedDateDisplayText] = useState<{
    checkIn: string;
    checkOut: string;
  }>({
    checkIn: "Choose date",
    checkOut: "Choose date",
  });
  const [totalsDisplay, setTotalsDisplay] = useState<PriceTotalsDisplay>();
  const [includePetFee, setIncludePetFee] = useState<boolean>(false);
  const [calendarSpaceId, setCalendarSpaceId] = useState<string>(
    calendarSpaces && calendarSpaces[0] && calendarSpaces[0].calendar_space_id
      ? calendarSpaces[0].calendar_space_id
      : ""
  );

  const calendarElementRef = useRef<HTMLDivElement>(null);
  const bookNowFormElementRef = useRef<HTMLDivElement>(null);

  console.log({ calendarSpaces, calendarSpaceId });

  useEffect(() => {
    const handleAutomaticDisplayToggleOfElements = (event: Event) => {
      const excludedClassnames = [
        "kst-book-now-form-check-in-date-button",
        "kst-book-now-form-check-out-date-button",
        "kst-check-in-out-calendar",
      ];
      const eventTriggerElement = event.target as HTMLDivElement;

      let eventTriggerElementClass = eventTriggerElement.classList[0];

      if (
        eventTriggerElementClass &&
        eventTriggerElementClass.slice(0, excludedClassnames[2].length) ===
          excludedClassnames[2]
      ) {
        eventTriggerElementClass = excludedClassnames[2];
      }

      if (
        !excludedClassnames.includes(eventTriggerElementClass) &&
        calendarElementRef.current
      ) {
        calendarElementRef.current.style.display = "none";
      }
    };

    document.addEventListener(
      "click",
      handleAutomaticDisplayToggleOfElements,
      true
    );

    return () => {
      document.removeEventListener(
        "click",
        handleAutomaticDisplayToggleOfElements,
        true
      );
    };
  }, []);

  useEffect(() => {
    if (
      "checkIn" in formSendData.dates &&
      formSendData.dates.checkIn.length < 1 &&
      "checkOut" in formSendData.dates &&
      formSendData.dates.checkOut.length < 1
    ) {
      return;
    }

    let updatedDateDisplayText = {
      checkIn: "Choose date",
      checkOut: "Choose date",
    };

    let headerElement = bookNowFormElementRef.current
      ?.children[2] as HTMLDivElement;
    let discountElement = bookNowFormElementRef.current
      ?.children[3] as HTMLDivElement;
    let avgNightlyPriceElement = bookNowFormElementRef.current
      ?.children[4] as HTMLDivElement;
    let totalsElement = bookNowFormElementRef.current
      ?.children[7] as HTMLDivElement;
    let submitButtonElement = bookNowFormElementRef.current
      ?.children[8] as HTMLButtonElement;

    if ("checkIn" in formSendData.dates) {
      const checkInDate = formSendData.dates.checkIn.split("-");

      updatedDateDisplayText.checkIn = `${months[checkInDate[1]]} ${
        checkInDate[2]
      }, ${checkInDate[0]}`;
    }

    if ("checkOut" in formSendData.dates) {
      const checkOutDate = formSendData.dates.checkOut.split("-");

      updatedDateDisplayText.checkOut = `${months[checkOutDate[1]]} ${
        checkOutDate[2]
      }, ${checkOutDate[0]}`;
    }
    (async () => {
      if ("checkIn" in formSendData.dates && "checkOut" in formSendData.dates) {
        const calendarDataByDateRange =
          await fetchPropertyCalenderDataByDateRange(
            propertyPageSlug,
            formSendData.dates.checkIn,
            formSendData.dates.checkOut,
            calendarSpaceId
          );
        const propertyPriceData = await fetchPropertyPriceData(
          propertyPageSlug
        );
        const propertyTaxPercentage = Number(
          propertyPriceData["tax_percentage"]
        );
        const propertyCleaningFee = Number(propertyPriceData["cleaning_fee"]);
        const propertyPetFee = Number(propertyPriceData["pet_fee"]);
        const propertyServiceFee = Number(propertyPriceData["service_fee"]);

        let subTotal = 0;
        let calculatedPetFee = 0;
        let calculatedCleaningFee = 0;

        for (let i = 0; i < calendarDataByDateRange.length; i++) {
          subTotal += Number(calendarDataByDateRange[i].price);

          if (calendarDataByDateRange[i].petFee) {
            calculatedPetFee += Number(calendarDataByDateRange[i].petFee);
          } else if (!Number.isNaN(propertyPetFee)) {
            calculatedPetFee += propertyPetFee;
          }

          if (calendarDataByDateRange[i].cleaningFee) {
            calculatedCleaningFee += Number(
              calendarDataByDateRange[i].cleaningFee
            );
          } else if (!Number.isNaN(propertyCleaningFee)) {
            calculatedCleaningFee += propertyCleaningFee;
          }
        }

        calculatedPetFee = calculatedPetFee / calendarDataByDateRange.length;
        calculatedCleaningFee =
          calculatedCleaningFee / calendarDataByDateRange.length;

        const avgNightPrice = subTotal / calendarDataByDateRange.length;
        const fees = {
          pet: includePetFee
            ? !Number.isNaN(calculatedPetFee)
              ? calculatedPetFee
              : 0
            : 0,
          cleaning: !Number.isNaN(calculatedCleaningFee)
            ? calculatedCleaningFee
            : 0,
          service:
            (subTotal +
              (!Number.isNaN(propertyPetFee) ? propertyPetFee : 0) +
              (!Number.isNaN(propertyCleaningFee) ? propertyCleaningFee : 0)) *
            ((!Number.isNaN(propertyServiceFee) ? propertyServiceFee : 1) /
              100),
        };
        const totalDueExcludingTaxes =
          subTotal + fees.pet + fees.cleaning + fees.service;
        const taxes =
          (totalDueExcludingTaxes * Number(propertyTaxPercentage)) / 100;
        const totalDueIncludingTaxes = totalDueExcludingTaxes + taxes;
        const taxesFeesCombined =
          taxes + fees.pet + fees.cleaning + fees.service;

        const updatedTotalsDisplay = {
          totalDue: formatPriceText(`${totalDueIncludingTaxes}`),
          subTotal: formatPriceText(`${subTotal}`),
          taxes: formatPriceText(`${taxes}`),
          fees: {
            pet: includePetFee ? formatPriceText(`${fees.pet}`) : null,
            cleaning: formatPriceText(`${fees.cleaning}`),
            service: formatPriceText(`${fees.service}`),
          },
          taxesFeesCombined: formatPriceText(`${taxesFeesCombined}`),
          avgNight: formatPriceText(`${avgNightPrice}`),
        };

        setTotalsDisplay(updatedTotalsDisplay);

        headerElement.style.display = "none";
        discountElement.style.display = "none";
        avgNightlyPriceElement.style.display = "flex";
        totalsElement.style.display = "flex";

        submitButtonElement.classList.add("enabled");
      } else {
        headerElement.style.display = "block";
        discountElement.style.display = "block";
        avgNightlyPriceElement.style.display = "none";

        if (totalsElement) {
          totalsElement.style.display = "none";
        }

        setTotalsDisplay({
          totalDue: "",
          subTotal: "",
          taxes: "",
          fees: {
            pet: "",
            cleaning: "",
            service: "",
          },
          taxesFeesCombined: "",
          avgNight: "",
        });

        submitButtonElement.classList.remove("enabled");
      }
    })();

    setFormattedDateDisplayText(updatedDateDisplayText);
  }, [formSendData, includePetFee]);

  return (
    <div ref={bookNowFormElementRef} className="kst-book-now-form">
      <div
        className="kst-book-now-form-close-button"
        onClick={(event) => {
          if (event.currentTarget.parentElement) {
            event.currentTarget.parentElement.style.display = "none";
            if (event.currentTarget.parentElement.parentElement) {
              event.currentTarget.parentElement.parentElement.style.background =
                "none";
              event.currentTarget.parentElement.parentElement.style.height =
                "auto";
            }
          }

          if (bookNowFormExpandFormContainerRef?.current) {
            bookNowFormExpandFormContainerRef.current.style.display = "flex";
          }
        }}
      >
        <div className="kst-book-now-form-close-button-svg-icon-container">
          {fetchSVGIcon("xIcon")}
        </div>
      </div>

      {calendarSpaces && calendarSpaces.length > 0 ? (
        <div className="kst-book-now-form-spaces-selection">
          <div
            className="kst-book-now-form-spaces-selection-selected"
            onClick={(e) => {
              let spaceSelections = document.getElementsByClassName(
                "kst-book-now-form-spaces-selections"
              )[0] as HTMLDivElement;
              const currentDisplay = spaceSelections.style.display;

              if (currentDisplay && currentDisplay === "flex") {
                spaceSelections.style.display = "none";
              } else {
                spaceSelections.style.display = "flex";
              }
            }}
          >
            {calendarSpaces[0].label}
          </div>

          <div className="kst-book-now-form-spaces-selections">
            {calendarSpaces.map((calendarSpace) => (
              <div
                className="kst-book-now-form-spaces-selections-option"
                onClick={(e) => {
                  const calendarSpaceId = (
                    e.currentTarget.children[0] as HTMLInputElement
                  ).value;
                  const calendarSpaceLabel =
                    e.currentTarget.children[1].textContent;

                  setCalendarSpaceId(calendarSpaceId);

                  let calendarSpaceSelectedLabel =
                    document.getElementsByClassName(
                      "kst-book-now-form-spaces-selection-selected"
                    )[0];
                  calendarSpaceSelectedLabel.textContent = calendarSpaceLabel;

                  let calendarSpacesSelectionContainer =
                    document.getElementsByClassName(
                      "kst-book-now-form-spaces-selections"
                    )[0] as HTMLDivElement;
                  calendarSpacesSelectionContainer.style.display = "none";
                }}
              >
                <input type="hidden" value={calendarSpace.calendar_space_id} />
                <label>{calendarSpace.label}</label>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div
        className="kst-book-now-form-header"
        dangerouslySetInnerHTML={{ __html: headerText }}
        style={{ display: "block" }}
      ></div>

      <div
        className="kst-book-now-form-discounts"
        dangerouslySetInnerHTML={{ __html: discountText }}
        style={{ display: "block" }}
      ></div>

      {totalsDisplay ? (
        <div className="kst-book-now-form-avg-nightly-price">
          <div className="kst-book-now-form-avg-nightly-price-header">
            <span>{`$${totalsDisplay.avgNight}`}</span>

            {`avg. nightly price`}
          </div>

          <div className="kst-book-now-form-avg-nightly-price-sub-text">
            {"Some utilities included"}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="kst-book-now-form-check-in-out-dates">
        <div className="kst-book-now-form-check-in-date">
          <div className="kst-book-now-form-check-in-date-header">
            {"Check-In"}
          </div>

          <div
            className="kst-book-now-form-check-in-date-button"
            onClick={(event) => {
              event.preventDefault();

              if (calendarElementRef.current)
                calendarElementRef.current.style.display = "flex";
            }}
          >
            {formattedDateDisplayText.checkIn}
          </div>
        </div>

        <div className="kst-book-now-form-check-out-date">
          <div className="kst-book-now-form-check-out-date-header">
            {"Check-Out"}
          </div>

          <div
            className="kst-book-now-form-check-out-date-button"
            onClick={(event) => {
              event.preventDefault();

              if (calendarElementRef.current)
                calendarElementRef.current.style.display = "flex";
            }}
          >
            {formattedDateDisplayText.checkOut}
          </div>
        </div>
      </div>

      <div className="kst-book-now-form-have-pets">
        <div
          className="kst-book-now-form-have-pets-toggle"
          onClick={(event) => {
            event.preventDefault();

            let toggleElement = event.currentTarget;

            if (toggleElement.classList.contains("enabled")) {
              setIncludePetFee(false);

              toggleElement.classList.remove("enabled");
            } else {
              setIncludePetFee(true);

              toggleElement.classList.add("enabled");
            }
          }}
        >
          <i className="fa-solid fa-check"></i>
        </div>

        <div className="kst-book-now-form-have-pets-question">
          {"Have Pets?"}
        </div>
      </div>

      {totalsDisplay ? (
        <div className="kst-book-now-form-totals">
          <div className="kst-book-now-form-totals-subtotal">
            <div className="kst-book-now-form-totals-subtotal-label">
              {"Subtotal"}
            </div>

            <div className="kst-book-now-form-totals-subtotal-number">
              {`$${totalsDisplay.subTotal}`}
            </div>
          </div>

          <div className="kst-book-now-form-totals-taxes-fees">
            <div
              className="kst-book-now-form-totals-taxes-fees-label"
              onClick={(event) => {
                event.preventDefault();

                const taxesFeesExpandedElement = event.currentTarget
                  .parentElement?.parentElement?.children[2] as HTMLDivElement;
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
              {`$${totalsDisplay.taxesFeesCombined}`}
            </div>
          </div>

          <div
            className="kst-book-now-form-totals-taxes-fees-expanded"
            style={{ display: "none" }}
          >
            {totalsDisplay.fees.pet ? (
              <div className="kst-book-now-form-totals-taxes-fees-expanded-item">
                <div className="kst-book-now-form-totals-taxes-fees-expanded-item-label">
                  {"Pet fee"}
                </div>

                <div className="kst-book-now-form-totals-taxes-fees-expanded-item-number">
                  {`$${totalsDisplay.fees.pet}`}
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
                {`$${totalsDisplay.fees.cleaning}`}
              </div>
            </div>

            <div className="kst-book-now-form-totals-taxes-fees-expanded-item">
              <div className="kst-book-now-form-totals-taxes-fees-expanded-item-label">
                {"Service fee"}
              </div>

              <div className="kst-book-now-form-totals-taxes-fees-expanded-item-number">
                {`$${totalsDisplay.fees.service}`}
              </div>
            </div>

            <div className="kst-book-now-form-totals-taxes-fees-expanded-item">
              <div className="kst-book-now-form-totals-taxes-fees-expanded-item-label">
                {"Taxes"}
              </div>

              <div className="kst-book-now-form-totals-taxes-fees-expanded-item-number">
                {`$${totalsDisplay.taxes}`}
              </div>
            </div>
          </div>

          <div className="kst-book-now-form-totals-due">
            <div className="kst-book-now-form-totals-due-label">
              {"Total Due"}
            </div>

            <div className="kst-book-now-form-totals-due-number">
              {`$${totalsDisplay.totalDue}`}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <button
        className="kst-book-now-form-submit-button"
        onClick={(event) => {
          event.preventDefault();

          const bookingDataForCookie = JSON.stringify({
            calendarSpaceId,
            propertyName,
            propertyImageUrl,
            spaces: {
              beds: numberOfBeds,
              baths: numberOfBaths,
            },
            dates: formSendData.dates,
            hasPet: formSendData.hasPet,
            priceTotals: totalsDisplay,
          });

          document.cookie = `bookingData=${bookingDataForCookie}; path=/; domain=${window.location.hostname}`;
          router.push(`/checkout/order-review`);
        }}
      >
        {"Book now"}
      </button>

      <div
        ref={calendarElementRef}
        className="kst-book-now-form-check-in-out-dates-calendar"
      >
        <PropertyCheckInOutCalendar
          propertyPageSlug={propertyPageSlug}
          calendarSpaceId={calendarSpaceId}
          setFormSendData={setFormSendData}
        />
      </div>
    </div>
  );
};
