export const blockMinimumDateElements = (
  dayElement: HTMLDivElement,
  daysMinimumStay: number
) => {
  for (let i = 2; i < daysMinimumStay; i++) {
    const isElementLastChild =
      dayElement === dayElement.parentElement?.lastChild;
    const nextMonthElement =
      dayElement.parentElement?.parentElement?.parentElement?.children[1];
    const isNextMonthElementSame =
      nextMonthElement === dayElement.parentElement?.parentElement;

    if (isElementLastChild && !isNextMonthElementSame) {
      const nextMonthElement =
        dayElement.parentElement?.parentElement?.parentElement?.children[1]
          .children[2];
      const nextDayElement = (
        Array.from(nextMonthElement?.childNodes ?? []) as HTMLDivElement[]
      ).find(
        (element) =>
          !element.classList.contains("kst-check-in-out-calendar-empty-day")
      );

      if (nextDayElement) {
        dayElement = nextDayElement;
      }
    } else if (isElementLastChild) {
      break;
    }

    dayElement = dayElement.nextSibling as HTMLDivElement;

    let currentBlockedDayPriceElements = dayElement.children[1]
      .children as unknown as HTMLDivElement[];

    dayElement.classList.add("in-between-selected-date");

    currentBlockedDayPriceElements[0].style.display = "none";
    currentBlockedDayPriceElements[1].style.display = "flex";
  }
};
