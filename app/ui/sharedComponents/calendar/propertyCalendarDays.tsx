import { TPropertyCalendarDays } from "@/app/types/calendarData";
import { getLastDayOfMonth } from "@/app/generalFunctions/calendar/getLastDayOfMonth";
import { generateDayElementConditionalStyling } from "@/app/generalFunctions/calendar/generateDayElementConditionalStyling";
import { calculateMinimumStayDate } from "@/app/generalFunctions/calendar/calculateMinimumDayStay";
import PropertyCalendarDayElement from "@/app/ui/sharedComponents/calendar/propertyCalendarDayElement";
import BlockedCalendarDayElement from "@/app/ui/sharedComponents/calendar/blockedCalendarDayElement";
import "@/app/ui/styles/scss/components/shared-components/calendar/calendar-days.scss";

export default ({
  dates,
  year,
  month,
  checkInOutDates,
  dateSelectingStatus,
  setDateSelectingStatus,
  setSelectedCheckInOutDates,
  selectedDateData,
  setSelectedDateData,
}: TPropertyCalendarDays) => {
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

  let minimumStayDate = checkInOutDates.in;

  if (selectedDateData) {
    minimumStayDate = calculateMinimumStayDate(
      checkInOutDates.in,
      selectedDateData.minimumDaysStay,
      lastDayOfMonth
    );
  }

  const minimumStayDateEpochTime = new Date(
    `${minimumStayDate}T00:00:00`
  ).getTime();

  let dayElementsArray = [];
  let currentDateIndexToCheck = 0;

  for (let i = 0; i < firstDayInWeekOfMonth; i++) {
    dayElementsArray.push(
      <div
        key={`empty-day-${i}`}
        className="kst-check-in-out-calendar-empty-day"
      ></div>
    );
  }

  for (let i = 0; i < lastDayOfMonth; i++) {
    let dayFormatted = (i + 1).toString();
    dayFormatted = dayFormatted.length < 2 ? `0${dayFormatted}` : dayFormatted;

    const dateFormatted = `${year}-${month}-${dayFormatted}`;
    const foundDateData =
      dates &&
      dates[currentDateIndexToCheck] &&
      dateFormatted === dates[currentDateIndexToCheck].date;

    console.log({
      dateFormatted,
      dateToCompare: dates[currentDateIndexToCheck]?.date,
      foundDateData,
    });

    if (foundDateData) {
      const dateData = dates[currentDateIndexToCheck];
      const isBooked = dates[currentDateIndexToCheck].isBooked;
      const priceText = isBooked
        ? "-"
        : `$${dates[currentDateIndexToCheck].price}`;
      const daysMinimumStay = dates[currentDateIndexToCheck].minimumDaysStay;
      const dateFormattedEpochTime = new Date(
        `${dateFormatted}T00:00:00`
      ).getTime();

      let conditionalStyling = generateDayElementConditionalStyling(
        dateFormattedEpochTime,
        checkInDateEpochTime,
        checkOutDateEpochTime,
        minimumStayDateEpochTime
      );

      const calendarDayElement = (
        <PropertyCalendarDayElement
          key={`day-${dateFormattedEpochTime}`}
          isBooked={isBooked}
          conditionalStyling={conditionalStyling}
          setSelectedDateData={setSelectedDateData}
          dateSelectingStatus={dateSelectingStatus}
          setDateSelectingStatus={setDateSelectingStatus}
          setSelectedCheckInOutDates={setSelectedCheckInOutDates}
          daysMinimumStay={daysMinimumStay}
          checkInOutDates={checkInOutDates}
          dateData={dateData}
          dateFormatted={dateFormatted}
          priceText={priceText}
          month={month}
          day={`${i + 1}`}
          year={year}
        />
      );

      dayElementsArray.push(calendarDayElement);

      currentDateIndexToCheck++;
    } else {
      const calendarDayElement = (
        <BlockedCalendarDayElement
          key={`blocked-day-${i + 1}`}
          day={`${i + 1}`}
          setDateSelectingStatus={setDateSelectingStatus}
        />
      );

      dayElementsArray.push(calendarDayElement);
    }
  }

  return <>{dayElementsArray}</>;
};
