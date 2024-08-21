export const calculateMinimumStayDate = (
  checkInDate: string,
  minimumDaysStay: number,
  lastDayOfMonth: number
) => {
  let minimumStayDate: any = checkInDate.split("-");
  let minimumStayDateDay: string = minimumStayDate[2];
  minimumDaysStay -= 1;

  if (+minimumStayDateDay + minimumDaysStay > lastDayOfMonth) {
    minimumStayDateDay = `${
      +minimumStayDateDay + minimumDaysStay - lastDayOfMonth
    }`;
    minimumStayDateDay =
      minimumStayDateDay.length < 2
        ? `0${minimumStayDateDay}`
        : minimumStayDateDay;

    const isEnteringIntoNewYear = +minimumStayDate[1] + 1 > 12;

    if (isEnteringIntoNewYear) {
      minimumStayDate[1] = "01";
      minimumStayDate[0] = `${+minimumStayDate[0] + 1}`;
    } else {
      minimumStayDate[1] = `${+minimumStayDate[1] + 1}`;
      minimumStayDate[1] =
        minimumStayDate[1].length < 2
          ? `0${minimumStayDate[1]}`
          : minimumStayDate[1];
    }
  } else {
    const updatedMinimumStayDateDay = +minimumStayDateDay + minimumDaysStay;

    minimumStayDateDay = `${updatedMinimumStayDateDay}`;

    minimumStayDateDay =
      minimumStayDateDay.length < 2
        ? `0${minimumStayDateDay}`
        : minimumStayDateDay;
  }

  return `${minimumStayDate[0]}-${minimumStayDate[1]}-${minimumStayDateDay}`;
};
