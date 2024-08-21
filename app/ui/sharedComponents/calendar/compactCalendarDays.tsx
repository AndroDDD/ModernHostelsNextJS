import { TCompactCalendarDays } from "@/app/types/calendarData";
import { getLastDayOfMonth } from "@/app/generalFunctions/calendar/getLastDayOfMonth";
import { generateDayElementConditionalStyling } from "@/app/generalFunctions/calendar/generateDayElementConditionalStyling";
import CompactCalendarDayElement from "@/app/ui/sharedComponents/calendar/compactCalendarDayElement";
import "@/app/ui/styles/scss/components/shared-components/calendar/calendar-days.scss";

export default ({
  year,
  month,
  checkInOutDates,
  dateSelectingStatus,
  setDateSelectingStatus,
  setCheckInOutDates,
}: TCompactCalendarDays) => {
  const firstDayInWeekOfMonth = new Date(
    `${year}-${month}-01T00:00:00`
  ).getDay();
  const lastDayOfMonth = getLastDayOfMonth(+year, +month);
  const checkInDateEpochTime = new Date(
    `${checkInOutDates.in}T00:00:00`
  ).getTime();
  const checkOutDateEpochTime = new Date(
    `${checkInOutDates.out}T00:00:00`
  ).getTime();

  let dayElementsArray = [];
  let currentDateIndexToCheck = 0;

  for (let i = 0; i < firstDayInWeekOfMonth; i++) {
    dayElementsArray.push(
      <div className="kst-check-in-out-calendar-empty-day compact"></div>
    );
  }

  for (let i = 0; i < lastDayOfMonth; i++) {
    let dayFormatted = (i + 1).toString();
    dayFormatted = dayFormatted.length < 2 ? `0${dayFormatted}` : dayFormatted;

    const dateFormatted = `${year}-${month}-${dayFormatted}`;

    const dateFormattedEpochTime = new Date(
      `${dateFormatted}T00:00:00`
    ).getTime();

    let conditionalStyling = generateDayElementConditionalStyling(
      dateFormattedEpochTime,
      checkInDateEpochTime,
      checkOutDateEpochTime
    );

    const calendarDayElement = (
      <CompactCalendarDayElement
        conditionalStyling={conditionalStyling}
        dateSelectingStatus={dateSelectingStatus}
        setDateSelectingStatus={setDateSelectingStatus}
        setCheckInOutDates={setCheckInOutDates}
        checkInOutDates={checkInOutDates}
        dateFormatted={dateFormatted}
        month={month}
        day={`${i + 1}`}
        year={year}
      />
    );

    dayElementsArray.push(calendarDayElement);

    currentDateIndexToCheck++;
  }

  return <>{dayElementsArray}</>;
};
