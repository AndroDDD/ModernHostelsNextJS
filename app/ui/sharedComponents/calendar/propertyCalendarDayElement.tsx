"use client";

import { TPropertyCalendarDayElementParameters } from "@/app/types/calendarData";
import { months } from "@/app/constants/months";
import { dateSelectingStatuses } from "@/app/constants/calendarDaySelectingStatuses";
import { updateCalendarAlertBoxElement } from "@/app/generalFunctions/calendar/updateCalendarAlertBoxElement";
import { sealValidDateRangeElements } from "@/app/generalFunctions/sealValidDateRangeElements";
import { blockMinimumDateElements } from "@/app/generalFunctions/calendar/blockMinimumDateElements";
import "@/app/ui/styles/scss/components/shared-components/calendar/calendar-day-element.scss";

export default ({
  isBooked,
  conditionalStyling,
  setSelectedDateData,
  dateSelectingStatus,
  setDateSelectingStatus,
  setSelectedCheckInOutDates,
  daysMinimumStay,
  checkInOutDates,
  dateData,
  dateFormatted,
  priceText,
  month,
  day,
  year,
}: TPropertyCalendarDayElementParameters) => {
  return (
    <div
      className={`kst-check-in-out-calendar-month-day ${
        isBooked ? "blocked" : ""
      } ${conditionalStyling.containerSelectedClassName}`}
      onClick={(event) => {
        event.preventDefault();

        if (isBooked) {
          if (dateSelectingStatus !== dateSelectingStatuses.done) {
            updateCalendarAlertBoxElement("Please select a different date", {
              color: "#fff",
              backgroundColor: "#f0beaa",
              padding: "4px 11px",
              margin: "20px 15px",
            });
          }
        } else {
          if (
            event.currentTarget.classList.contains("selected-start-date") ||
            event.currentTarget.classList.contains("in-between-selected-date")
          ) {
            return;
          }

          const selectedDayElement = event.currentTarget;

          const selectedDayElementTraverse = selectedDayElement;
          const selectedDayPriceElements = selectedDayElementTraverse
            .children[1].children as unknown as HTMLDivElement[];

          switch (dateSelectingStatus) {
            case dateSelectingStatuses.choosingStartDate:
              {
                const alertText = `This property has a minimum stay of ${daysMinimumStay} nights beginning on ${months[month]} ${day}, ${year}`;

                updateCalendarAlertBoxElement(alertText, {
                  color: "#000",
                  backgroundColor: "#fff",
                  padding: "4px 11px",
                  margin: "15px 0 0",
                });

                selectedDayElementTraverse.classList.add("selected-start-date");

                selectedDayPriceElements[0].style.display = "none";
                selectedDayPriceElements[1].style.display = "flex";

                let currentBlockedDayElement =
                  selectedDayElement as HTMLDivElement;

                blockMinimumDateElements(
                  currentBlockedDayElement,
                  daysMinimumStay
                );

                setSelectedCheckInOutDates((prevSelectedDates) => {
                  return { in: `${dateFormatted}`, out: "" };
                });
                setSelectedDateData(dateData);
                setDateSelectingStatus(dateSelectingStatuses.choosingEndDate);
              }
              break;

            case dateSelectingStatuses.choosingEndDate:
              {
                const checkInDate = new Date(`${checkInOutDates.in}T00:00:00`);
                const checkOutDate = new Date(`${dateFormatted}T00:00:00`);

                const isValidDateRange = sealValidDateRangeElements(
                  selectedDayElementTraverse,
                  checkInDate,
                  checkOutDate
                );

                if (isValidDateRange) {
                  setSelectedCheckInOutDates({
                    ...checkInOutDates,
                    out: dateFormatted,
                  });
                  setDateSelectingStatus(dateSelectingStatuses.done);
                }
              }
              break;
          }
        }
      }}
    >
      <div className="kst-check-in-out-calendar-month-day-index-number">
        {day}
      </div>

      <div className="kst-check-in-out-calendar-month-day-price">
        <div
          className="kst-check-in-out-calendar-month-day-price-static"
          style={
            isBooked
              ? { display: "none" }
              : { display: conditionalStyling.priceDisplay.static.display }
          }
        >
          {priceText}
        </div>
        <div
          className="kst-check-in-out-calendar-month-day-price-dynamic"
          style={
            isBooked
              ? { display: "flex" }
              : { display: conditionalStyling.priceDisplay.dynamic.display }
          }
        >
          {"-"}
        </div>
      </div>
    </div>
  );
};
