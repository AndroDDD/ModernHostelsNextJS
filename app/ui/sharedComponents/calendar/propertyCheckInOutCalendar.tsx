"use client";

import { useEffect, useState } from "react";

import { TPropertyCheckInOutCalendar } from "@/app/types/calendarData";
import { PropertyCalendarItemData } from "@/app/types/propertyCalendarData";
import { dateSelectingStatuses } from "@/app/constants/calendarDaySelectingStatuses";
import { fetchPropertyCalenderMonthData } from "@/app/generalFunctions/apiDataFetches/fetchPropertyCalendarData";
import PropertyMonthBlock from "@/app/ui/sharedComponents/calendar/propertyMonthBlock";
import AlertBlock from "@/app/ui/sharedComponents/calendar/alertBlock";
import ActionsElement from "@/app/ui/sharedComponents/calendar/actionsElement";
import "@/app/ui/styles/scss/components/shared-components/calendar/check-in-out-calendar.scss";

export default ({
  propertyPageSlug,
  setFormSendData,
}: TPropertyCheckInOutCalendar) => {
  const [calendarDatesData, setCalendarDatesData] = useState<{
    left: PropertyCalendarItemData[];
    right: PropertyCalendarItemData[];
  }>();
  const [selectedDateData, setSelectedDateData] =
    useState<PropertyCalendarItemData>();
  const [selectedCheckInOutDates, setSelectedCheckInOutDates] = useState({
    in: "",
    out: "",
  });
  const [dateSelectingStatus, setDateSelectingStatus] = useState<string>(
    dateSelectingStatuses.choosingStartDate
  );
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    right: {
      year: string;
      month: string;
    };
    left: {
      year: string;
      month: string;
    };
  }>();

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentYearToString = currentYear.toString();
    const rightMonthYear =
      currentMonth + 1 > 12
        ? (currentYear + 1).toString()
        : currentYear.toString();

    let currentMonthToString = currentMonth.toString();
    currentMonthToString =
      currentMonthToString.length < 2
        ? `0${currentMonthToString}`
        : currentMonthToString;

    let rightMonth =
      currentMonth + 1 > 12 ? "01" : (currentMonth + 1).toString();
    rightMonth = rightMonth.length < 2 ? `0${rightMonth}` : rightMonth;

    setSelectedYearMonth(() => {
      return {
        left: {
          year: currentYearToString,
          month: currentMonthToString,
        },
        right: {
          year: rightMonthYear,
          month: rightMonth,
        },
      };
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedYearMonth) {
        console.log("running running");
        const leftMonthData = await fetchPropertyCalenderMonthData(
          propertyPageSlug,
          selectedYearMonth.left.year,
          selectedYearMonth.left.month
        );
        const rightMonthData = await fetchPropertyCalenderMonthData(
          propertyPageSlug,
          selectedYearMonth.right.year,
          selectedYearMonth.right.month
        );
        setCalendarDatesData({
          left: leftMonthData,
          right: rightMonthData,
        });
      }
    })();
  }, [selectedYearMonth]);

  return (
    <div className="kst-check-in-out-calendar">
      {calendarDatesData ? (
        <>
          <PropertyMonthBlock
            sideOfCalendar="left"
            calendarDatesData={calendarDatesData.left}
            checkInOutDates={selectedCheckInOutDates}
            yearMonth={{
              year: selectedYearMonth ? selectedYearMonth.left.year : "",
              month: selectedYearMonth ? selectedYearMonth.left.month : "",
            }}
            setYearMonth={setSelectedYearMonth}
            setSelectedCheckInOutDates={setSelectedCheckInOutDates}
            dateSelectingStatus={dateSelectingStatus}
            setDateSelectingStatus={setDateSelectingStatus}
            setSelectedDateData={setSelectedDateData}
            selectedDateData={selectedDateData}
          />
          <PropertyMonthBlock
            sideOfCalendar="center"
            calendarDatesData={calendarDatesData.left}
            checkInOutDates={selectedCheckInOutDates}
            yearMonth={{
              year: selectedYearMonth ? selectedYearMonth.left.year : "",
              month: selectedYearMonth ? selectedYearMonth.left.month : "",
            }}
            setYearMonth={setSelectedYearMonth}
            setSelectedCheckInOutDates={setSelectedCheckInOutDates}
            dateSelectingStatus={dateSelectingStatus}
            setDateSelectingStatus={setDateSelectingStatus}
            setSelectedDateData={setSelectedDateData}
            selectedDateData={selectedDateData}
          />
          <PropertyMonthBlock
            sideOfCalendar="right"
            calendarDatesData={calendarDatesData.right}
            checkInOutDates={selectedCheckInOutDates}
            yearMonth={{
              year: selectedYearMonth ? selectedYearMonth.right.year : "",
              month: selectedYearMonth ? selectedYearMonth.right.month : "",
            }}
            setYearMonth={setSelectedYearMonth}
            setSelectedCheckInOutDates={setSelectedCheckInOutDates}
            dateSelectingStatus={dateSelectingStatus}
            setDateSelectingStatus={setDateSelectingStatus}
            setSelectedDateData={setSelectedDateData}
            selectedDateData={selectedDateData}
          />
          <AlertBlock />
          <ActionsElement
            checkInOutDates={selectedCheckInOutDates}
            setFormData={setFormSendData}
            setSelectedCheckInOutDates={setSelectedCheckInOutDates}
            setDateSelectingStatus={setDateSelectingStatus}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
