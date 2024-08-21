import { updateCalendarAlertBoxElement } from "@/app/generalFunctions/calendar/updateCalendarAlertBoxElement";
import { toggleCalendarApplyButton } from "@/app/generalFunctions/toggleCalendarApplyButton";
import { revertInBetweenDayElementsStyle } from "@/app/generalFunctions/calendar/revertInBetweenDayElementsStyle";

export const sealValidDateRangeElements = (
  dayElement: HTMLDivElement,
  checkInDate: Date,
  checkOutDate: Date,
  calendarType?: string
): boolean => {
  let isValidDateRange = false;
  let selectedDayPriceElements = dayElement.children[1]
    .children as unknown as HTMLDivElement[];

  if (checkInDate.getTime() > checkOutDate.getTime()) {
    updateCalendarAlertBoxElement(
      "Check out date must be after check in date. Please select a different date",
      {
        color: "#fff",
        backgroundColor: "#f0beaa",
        padding: "4px 11px",
        margin: "20px 15px",
      }
    );

    isValidDateRange = false;
  } else {
    dayElement.classList.add("selected-end-date");

    selectedDayPriceElements[0].style.display = "flex";
    selectedDayPriceElements[1].style.display = "none";

    let currentPreviousDayElement =
      dayElement.previousElementSibling as HTMLDivElement;
    let isLoopingPreviousDays = true;

    while (isLoopingPreviousDays) {
      if (!currentPreviousDayElement) {
        isLoopingPreviousDays = false;

        break;
      }

      if (currentPreviousDayElement.classList.contains("blocked")) {
        revertInBetweenDayElementsStyle(currentPreviousDayElement);

        isLoopingPreviousDays = false;
        isValidDateRange = false;

        break;
      } else if (
        currentPreviousDayElement.classList.contains(
          "in-between-selected-date"
        ) ||
        currentPreviousDayElement.classList.contains("selected-start-date")
      ) {
        isLoopingPreviousDays = false;
        isValidDateRange = true;

        break;
      } else if (
        currentPreviousDayElement.classList.contains(
          "kst-check-in-out-calendar-empty-day"
        )
      ) {
        const previousMonthElement =
          currentPreviousDayElement.parentElement?.parentElement?.parentElement
            ?.children[0];

        if (
          previousMonthElement !=
          currentPreviousDayElement.parentElement?.parentElement
        ) {
          currentPreviousDayElement = previousMonthElement?.children[2]
            .lastChild as HTMLDivElement;
        } else {
          break;
        }
      }

      currentPreviousDayElement.classList.add("in-between-selected-date");

      const currentPreviousPriceElements = currentPreviousDayElement.children[1]
        .children as unknown as HTMLDivElement[];

      currentPreviousPriceElements[0].style.display = "none";
      currentPreviousPriceElements[1].style.display = "flex";

      currentPreviousDayElement =
        currentPreviousDayElement.previousElementSibling as HTMLDivElement;

      isValidDateRange = true;
    }

    if (isValidDateRange) {
      updateCalendarAlertBoxElement(
        `${checkInDate.toLocaleDateString()} through ${checkOutDate.toLocaleDateString()} has been selected.`,
        {
          color: "#000",
          backgroundColor: "#fff",
          padding:
            calendarType && calendarType === "compact"
              ? "0px 11px"
              : "4px 11px",
          margin:
            calendarType && calendarType === "compact"
              ? "10px 0 0"
              : "15px 0 0",
        }
      );

      toggleCalendarApplyButton(false);
    } else {
      updateCalendarAlertBoxElement(
        "Date range currently contains blocked dates. Please select a different date range",
        {
          color: "#fff",
          backgroundColor: "#f0beaa",
          padding: "4px 11px",
          margin: "20px 15px",
        }
      );
    }
  }

  return isValidDateRange;
};
