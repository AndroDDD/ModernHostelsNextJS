"use client";
import { useState } from "react";

import { TCompactMonthBlock } from "@/app/types/calendarData";
import { months } from "@/app/constants/months";
import CompactCalendarDays from "@/app/ui/sharedComponents/calendar/compactCalendarDays";
import "@/app/ui/styles/scss/components/shared-components/calendar/month-block.scss";

export default ({
  checkInOutDates,
  dateSelectingStatus,
  setDateSelectingStatus,
  setCheckInOutDates,
  setYearMonth,
  yearMonth,
}: TCompactMonthBlock) => {
  const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(true);

  return (
    <div className="kst-check-in-out-calendar-month compact">
      <div className="kst-check-in-out-calendar-month-header compact">
        <>
          <div
            className="kst-check-in-out-calendar-month-header-button compact"
            style={{
              left: "0px",
              visibility: isCurrentMonth ? "hidden" : "visible",
            }}
            onClick={(event) => {
              event.preventDefault();

              const currentDate = new Date();
              const currentYear = currentDate.getFullYear().toString();

              let currentMonth = (currentDate.getMonth() + 1).toString();
              currentMonth =
                currentMonth.length < 2 ? `0${currentMonth}` : currentMonth;

              if (
                currentMonth === yearMonth.month &&
                currentYear === yearMonth.year
              ) {
                return;
              }

              const isMonthInPreviousYear = +yearMonth.month - 1 <= 0;
              let updatedMonth = isMonthInPreviousYear
                ? "12"
                : `${+yearMonth.month - 1}`;
              let updatedYear = isMonthInPreviousYear
                ? `${+yearMonth.year - 1}`
                : yearMonth.year;

              if (updatedMonth.length < 2) {
                updatedMonth = `0${updatedMonth}`;
              }

              if (
                updatedMonth === currentMonth &&
                updatedYear === currentYear
              ) {
                setIsCurrentMonth(true);
              } else {
                setIsCurrentMonth(false);
              }

              setYearMonth(() => {
                const updatedYearMonth = {
                  year: updatedYear,
                  month: updatedMonth,
                };

                return updatedYearMonth;
              });
            }}
          >
            {"<"}
          </div>

          <div className="kst-check-in-out-calendar-month-header-text compact">
            {`${months[yearMonth.month]} ${yearMonth.year}`}
          </div>

          <div
            className="kst-check-in-out-calendar-month-header-button compact"
            style={{ right: "0px" }}
            onClick={(event) => {
              event.preventDefault();

              const isMonthInNextYear = +yearMonth.month + 1 > 12;
              let updatedMonth = isMonthInNextYear
                ? "01"
                : `${+yearMonth.month + 1}`;
              let updatedYear = isMonthInNextYear
                ? `${+yearMonth.year + 1}`
                : yearMonth.year;

              if (updatedMonth.length < 2) {
                updatedMonth = `0${updatedMonth}`;
              }

              setIsCurrentMonth(false);

              setYearMonth(() => {
                const updatedYearMonth = {
                  year: updatedYear,
                  month: updatedMonth,
                };

                return updatedYearMonth;
              });
            }}
          >
            {">"}
          </div>
        </>
      </div>

      <div className="kst-check-in-out-calendar-month-day-labels compact">
        {["Su", "Mon", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div className="kst-check-in-out-calendar-month-day-label compact">
            {day}
          </div>
        ))}
      </div>

      <div className="kst-check-in-out-calendar-month-days compact">
        <CompactCalendarDays
          year={yearMonth.year}
          month={yearMonth.month}
          checkInOutDates={checkInOutDates}
          dateSelectingStatus={dateSelectingStatus}
          setCheckInOutDates={setCheckInOutDates}
          setDateSelectingStatus={setDateSelectingStatus}
        />
      </div>
    </div>
  );
};
