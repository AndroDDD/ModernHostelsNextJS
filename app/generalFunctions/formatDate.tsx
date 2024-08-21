import { monthsAbbreviated, months } from "@/app/constants/months";

export const formatDateDisplay = (date: string): string => {
  const dateObject = new Date(`${date}T00:00:00`);

  let dateObjectDay = `${dateObject.getDate()}`;
  dateObjectDay =
    dateObjectDay.length < 2 ? `0${dateObjectDay}` : dateObjectDay;

  let dateObjectMonth = `${dateObject.getMonth() + 1}`;
  dateObjectMonth =
    dateObjectMonth.length < 2 ? `0${dateObjectMonth}` : dateObjectMonth;

  let formattedDateString = `${monthsAbbreviated[dateObjectMonth]} ${dateObjectDay}`;

  return formattedDateString;
};

export const formatNewDateParameter = (date: string) => {
  let dateSplitted = date.split(" ");

  if (dateSplitted.length === 3) {
    const year = dateSplitted[2];
    const month = findMonthIndex(dateSplitted[0]);

    let day =
      dateSplitted[1][dateSplitted[1].length - 1] === ","
        ? dateSplitted[1].slice(0, -1)
        : dateSplitted[1];
    day = day.length < 2 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  return date;
};

const findMonthIndex = (month: string) => {
  const monthsAbbreviatedEntries = Object.entries(monthsAbbreviated);
  const monthsEntries = Object.entries(months);
  const isFoundInAbbreviatedEntries = monthsAbbreviatedEntries.find(
    (monthAbbreviated) => monthAbbreviated[1] === month
  );
  const isFoundInMonthsEntries = monthsEntries.find(
    (month) => monthsEntries[1] === month
  );

  if (isFoundInAbbreviatedEntries) {
    return isFoundInAbbreviatedEntries[0];
  } else if (isFoundInMonthsEntries) {
    return isFoundInMonthsEntries[0];
  } else {
    return "NotValidMonth";
  }
};
