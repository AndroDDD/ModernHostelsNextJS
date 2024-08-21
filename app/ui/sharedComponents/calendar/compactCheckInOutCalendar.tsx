"use client";
import { useEffect, useState } from "react";

import { TCompactCheckInOutCalendar } from "@/app/types/calendarData";
import { dateSelectingStatuses } from "@/app/constants/calendarDaySelectingStatuses";
import CompactMonthBlock from "@/app/ui/sharedComponents/calendar/compactMonthBlock";
import AlertBlock from "@/app/ui/sharedComponents/calendar/alertBlock";
import ActionsElement from "@/app/ui/sharedComponents/calendar/actionsElement";
import "@/app/ui/styles/scss/components/shared-components/calendar/check-in-out-calendar.scss";

export default ({ setFiltersData }: TCompactCheckInOutCalendar) => {
  const [selectedCheckInOutDates, setSelectedCheckInOutDates] = useState({
    in: "",
    out: "",
  });
  const [dateSelectingStatus, setDateSelectingStatus] = useState<string>(
    dateSelectingStatuses.choosingStartDate
  );
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    year: string;
    month: string;
  }>();

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentYearToString = currentYear.toString();

    let currentMonthToString = currentMonth.toString();
    currentMonthToString =
      currentMonthToString.length < 2
        ? `0${currentMonthToString}`
        : currentMonthToString;

    setSelectedYearMonth(() => {
      return {
        year: currentYearToString,
        month: currentMonthToString,
      };
    });
  }, []);

  return (
    <div className="kst-check-in-out-calendar compact">
      <CompactMonthBlock
        checkInOutDates={selectedCheckInOutDates}
        yearMonth={{
          year: selectedYearMonth ? selectedYearMonth.year : "",
          month: selectedYearMonth ? selectedYearMonth.month : "",
        }}
        setYearMonth={setSelectedYearMonth}
        setCheckInOutDates={setSelectedCheckInOutDates}
        dateSelectingStatus={dateSelectingStatus}
        setDateSelectingStatus={setDateSelectingStatus}
      />
      <AlertBlock calendarType="compact" />
      <ActionsElement
        checkInOutDates={selectedCheckInOutDates}
        setFormData={setFiltersData}
        setSelectedCheckInOutDates={setSelectedCheckInOutDates}
        setDateSelectingStatus={setDateSelectingStatus}
        calendarType="compact"
      />
    </div>
  );
};
