"use client";

import { TPropertyMonthBlock } from "@/app/types/calendarData";
import { months } from "@/app/constants/months";
import PropertyCalendarDays from "@/app/ui/sharedComponents/calendar/propertyCalendarDays";
import "@/app/ui/styles/scss/components/shared-components/calendar/month-block.scss";

export default ({
  sideOfCalendar,
  calendarDatesData,
  checkInOutDates,
  yearMonth,
  setYearMonth,
  dateSelectingStatus,
  setDateSelectingStatus,
  setSelectedCheckInOutDates,
  setSelectedDateData,
  selectedDateData,
}: TPropertyMonthBlock) => {
  return (
    <div className={`kst-check-in-out-calendar-month ${sideOfCalendar}`}>
      <div className="kst-check-in-out-calendar-month-header">
        {sideOfCalendar === "left" ? (
          <>
            <div
              className="kst-check-in-out-calendar-month-header-button"
              style={{ left: "0px" }}
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

                setYearMonth(() => {
                  const updatedYearMonth = {
                    left: {
                      year: updatedYear,
                      month: updatedMonth,
                    },
                    right: {
                      year: yearMonth.year,
                      month: yearMonth.month,
                    },
                  };

                  return updatedYearMonth;
                });
              }}
            >
              {"<"}
            </div>

            <div className="kst-check-in-out-calendar-month-header-text">
              {`${months[yearMonth.month]} ${yearMonth.year}`}
            </div>
          </>
        ) : sideOfCalendar === "center" ? (
          <>
            <div
              className="kst-check-in-out-calendar-month-header-button"
              style={{ left: "0px" }}
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

                setYearMonth(() => {
                  const updatedYearMonth = {
                    left: {
                      year: updatedYear,
                      month: updatedMonth,
                    },
                    right: {
                      year: yearMonth.year,
                      month: yearMonth.month,
                    },
                  };

                  return updatedYearMonth;
                });
              }}
            >
              {"<"}
            </div>

            <div className="kst-check-in-out-calendar-month-header-text">
              {`${months[yearMonth.month]} ${yearMonth.year}`}
            </div>

            <div
              className="kst-check-in-out-calendar-month-header-button"
              style={{ right: "0px" }}
              onClick={(event) => {
                event.preventDefault();

                const isLeftMonthInNextYear = +yearMonth.month + 1 > 12;
                let updatedLeftMonth = isLeftMonthInNextYear
                  ? "01"
                  : `${+yearMonth.month + 1}`;
                let updatedLeftYear = isLeftMonthInNextYear
                  ? `${+yearMonth.year + 1}`
                  : yearMonth.year;

                if (updatedLeftMonth.length < 2) {
                  updatedLeftMonth = `0${updatedLeftMonth}`;
                }

                const isRightMonthInNextYear = +updatedLeftMonth + 1 > 12;
                let updatedRightMonth = isRightMonthInNextYear
                  ? "01"
                  : `${+updatedLeftMonth + 1}`;
                let updatedRightYear = isRightMonthInNextYear
                  ? `${+updatedLeftYear + 1}`
                  : yearMonth.year;

                if (updatedRightMonth.length < 2) {
                  updatedRightMonth = `0${updatedRightMonth}`;
                }

                setYearMonth(() => {
                  const updatedYearMonth = {
                    left: {
                      year: updatedLeftYear,
                      month: updatedLeftMonth,
                    },
                    right: {
                      year: updatedRightYear,
                      month: updatedRightMonth,
                    },
                  };

                  return updatedYearMonth;
                });
              }}
            >
              {">"}
            </div>
          </>
        ) : (
          <>
            <div className="kst-check-in-out-calendar-month-header-text">
              {`${months[yearMonth.month]} ${yearMonth.year}`}
            </div>

            <div
              className="kst-check-in-out-calendar-month-header-button"
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

                setYearMonth(() => {
                  const updatedYearMonth = {
                    left: {
                      year: yearMonth.year,
                      month: yearMonth.month,
                    },
                    right: {
                      year: updatedYear,
                      month: updatedMonth,
                    },
                  };

                  return updatedYearMonth;
                });
              }}
            >
              {">"}
            </div>
          </>
        )}
      </div>

      <div className="kst-check-in-out-calendar-month-day-labels">
        {["Su", "Mon", "Tu", "We", "Th", "Fr", "Sa"].map((day, dayIndex) => (
          <div
            key={`kst-check-in-out-calendar-month-day-label-${dayIndex}`}
            className="kst-check-in-out-calendar-month-day-label"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="kst-check-in-out-calendar-month-days">
        <PropertyCalendarDays
          dates={calendarDatesData}
          year={yearMonth.year}
          month={yearMonth.month}
          checkInOutDates={checkInOutDates}
          dateSelectingStatus={dateSelectingStatus}
          setSelectedCheckInOutDates={setSelectedCheckInOutDates}
          setDateSelectingStatus={setDateSelectingStatus}
          setSelectedDateData={setSelectedDateData}
          selectedDateData={selectedDateData}
        />
      </div>
    </div>
  );
};
