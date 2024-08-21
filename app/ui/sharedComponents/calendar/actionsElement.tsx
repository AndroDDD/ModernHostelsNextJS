"use client";

import { TActionsElement } from "@/app/types/calendarData";
import { BookNowFormSendData } from "@/app/types/bookNowFormData";
import { dateSelectingStatuses } from "@/app/constants/calendarDaySelectingStatuses";
import { revertDayElements } from "@/app/generalFunctions/calendar/revertDayElements";
import { updateCalendarAlertBoxElement } from "@/app/generalFunctions/calendar/updateCalendarAlertBoxElement";
import { toggleCalendarApplyButton } from "@/app/generalFunctions/toggleCalendarApplyButton";
import "@/app/ui/styles/scss/components/shared-components/calendar/actions-element.scss";
import { FilterBarData } from "@/app/types/mapPageData";

export default ({
  checkInOutDates,
  setSelectedCheckInOutDates,
  setFormData,
  setDateSelectingStatus,
  calendarType,
}: TActionsElement) => {
  return (
    <div
      className={`kst-check-in-out-calendar-actions ${
        calendarType ? (calendarType === "compact" ? "compact" : "") : ""
      }`}
    >
      <div
        className={`kst-check-in-out-calendar-actions-clear-dates ${
          calendarType ? (calendarType === "compact" ? "compact" : "") : ""
        }`}
        onClick={(event) => {
          event.preventDefault();

          const calendarElement =
            event.currentTarget.parentElement?.parentElement;

          if (
            calendarElement?.children[0].classList.contains(
              "kst-check-in-out-calendar-month"
            )
          ) {
            let monthDayElements = Array.from(
              calendarElement.children[0].children[2].children
            ) as HTMLDivElement[];

            revertDayElements(monthDayElements);
          }

          if (
            calendarElement?.children[1].classList.contains(
              "kst-check-in-out-calendar-month"
            )
          ) {
            let rightMonthDayElements = Array.from(
              calendarElement.children[1].children[2].children
            ) as HTMLDivElement[];

            revertDayElements(rightMonthDayElements);
          }

          setSelectedCheckInOutDates({ in: "", out: "" });
          setDateSelectingStatus(dateSelectingStatuses.choosingStartDate);

          if (setFormData) {
            setFormData((prevData) => {
              if ("hasPet" in prevData) {
                let prevDataCasted = prevData as BookNowFormSendData;

                const updatedData: BookNowFormSendData = {
                  ...prevDataCasted,
                  dates: {
                    checkIn: "",
                    checkOut: "",
                  },
                };

                return updatedData;
              } else {
                let prevDataCasted = prevData as FilterBarData;

                const updatedData: FilterBarData = {
                  ...prevDataCasted,
                  dates: {
                    start: "",
                    end: "",
                  },
                };

                return updatedData;
              }
            });
          }

          updateCalendarAlertBoxElement("Dates have been cleared.", {
            color: "#fff",
            backgroundColor: "#f0beaa",
            padding: "4px 11px",
            margin: "20px 15px",
          });

          toggleCalendarApplyButton(true);
        }}
      >
        {"Clear dates"}
      </div>

      <div
        className={`kst-check-in-out-calendar-actions-apply ${
          calendarType ? (calendarType === "compact" ? "compact" : "") : ""
        }`}
        onClick={(event) => {
          event.preventDefault();

          const isEnabled = event.currentTarget.classList.contains("enabled");

          if (isEnabled && setFormData) {
            setFormData((prevData) => {
              if ("hasPet" in prevData) {
                let prevDataCasted = prevData as BookNowFormSendData;

                const updatedData: BookNowFormSendData = {
                  ...prevDataCasted,
                  dates: {
                    checkIn: checkInOutDates.in,
                    checkOut: checkInOutDates.out,
                  },
                };

                return updatedData;
              } else {
                let prevDataCasted = prevData as FilterBarData;

                const updatedData: FilterBarData = {
                  ...prevDataCasted,
                  dates: {
                    start: checkInOutDates.in,
                    end: checkInOutDates.out,
                  },
                };

                console.log({
                  filterBarDate: "",
                  updatedData,
                });

                return updatedData;
              }
            });

            const calendarContainerElement =
              event.currentTarget.parentElement?.parentElement?.parentElement;

            if (calendarContainerElement) {
              calendarContainerElement.style.display = "none";
            }
          }
        }}
      >
        {"Apply"}
      </div>
    </div>
  );
};
