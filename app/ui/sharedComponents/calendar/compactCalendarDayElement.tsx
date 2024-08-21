"use client";

import { TCompactCalendarDayElementParameters } from "@/app/types/calendarData";
import { dateSelectingStatuses } from "@/app/constants/calendarDaySelectingStatuses";
import { sealValidDateRangeElements } from "@/app/generalFunctions/sealValidDateRangeElements";
import "@/app/ui/styles/scss/components/shared-components/calendar/calendar-day-element.scss";

export default ({
  conditionalStyling,
  dateSelectingStatus,
  setDateSelectingStatus,
  setCheckInOutDates,
  checkInOutDates,
  dateFormatted,
  month,
  day,
  year,
}: TCompactCalendarDayElementParameters) => {
  return (
    <div
      className={`kst-check-in-out-calendar-month-day compact ${conditionalStyling.containerSelectedClassName}`}
      onClick={(event) => {
        event.preventDefault();

        {
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
                selectedDayElementTraverse.classList.add("selected-start-date");

                selectedDayPriceElements[0].style.display = "none";
                selectedDayPriceElements[1].style.display = "flex";

                let currentBlockedDayElement =
                  selectedDayElement as HTMLDivElement;

                setCheckInOutDates(() => {
                  return { in: `${dateFormatted}`, out: "" };
                });
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
                  checkOutDate,
                  "compact"
                );

                if (isValidDateRange) {
                  setCheckInOutDates({
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
      <div className="kst-check-in-out-calendar-month-day-index-number compact">
        {day}
      </div>

      <div className="kst-check-in-out-calendar-month-day-price compact">
        <div
          className="kst-check-in-out-calendar-month-day-price-static"
          style={{ display: conditionalStyling.priceDisplay.static.display }}
        ></div>
        <div
          className="kst-check-in-out-calendar-month-day-price-dynamic compact"
          style={{ display: conditionalStyling.priceDisplay.dynamic.display }}
        >
          {"-"}
        </div>
      </div>
    </div>
  );
};
