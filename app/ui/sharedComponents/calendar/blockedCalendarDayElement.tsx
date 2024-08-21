"use client";

import { dateSelectingStatuses } from "@/app/constants/calendarDaySelectingStatuses";
import { updateCalendarAlertBoxElement } from "@/app/generalFunctions/calendar/updateCalendarAlertBoxElement";

import "@/app/ui/styles/scss/components/shared-components/calendar/blocked-calendar-day-element.scss";

type BlockedCalendarDayElementParameters = {
  day: string;
  setDateSelectingStatus: React.Dispatch<React.SetStateAction<string>>;
};

export default ({
  day,
  setDateSelectingStatus,
}: BlockedCalendarDayElementParameters) => {
  return (
    <div
      className="kst-check-in-out-calendar-month-day blocked"
      onClick={(event) => {
        event.preventDefault();

        setDateSelectingStatus((currentSelectingStatus) => {
          if (currentSelectingStatus !== dateSelectingStatuses.done) {
            updateCalendarAlertBoxElement("Please select a different date", {
              color: "#fff",
              backgroundColor: "#f0beaa",
              padding: "4px 11px",
              margin: "20px 15px",
            });
          }

          return currentSelectingStatus;
        });
      }}
    >
      <div className="kst-check-in-out-calendar-month-day-index-number">
        {day}
      </div>

      <div className="kst-check-in-out-calendar-month-day-price">{"-"}</div>
    </div>
  );
};
