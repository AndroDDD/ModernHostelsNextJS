export const revertInBetweenDayElementsStyle = (dayElement: HTMLDivElement) => {
  let isRevertingDayStyles = true;

  while (isRevertingDayStyles) {
    if (dayElement.nextSibling) {
      dayElement = dayElement.nextElementSibling as HTMLDivElement;
    } else {
      const nextMonthElement =
        dayElement.parentElement?.parentElement?.parentElement?.children[1];

      if (nextMonthElement != dayElement.parentElement?.parentElement) {
        const newDayElement = (
          Array.from(
            nextMonthElement?.children[2].children ?? []
          ) as HTMLDivElement[]
        ).find(
          (element) =>
            !element.classList.contains("kst-check-in-out-calendar-empty-day")
        );

        if (newDayElement) {
          dayElement = newDayElement;
        }
      }
    }

    let dayPriceElements = dayElement.children[1]
      .children as unknown as HTMLDivElement[];

    if (dayElement.classList.contains("in-between-selected-date")) {
      dayElement.classList.remove("in-between-selected-date");
      dayPriceElements[0].style.display = "flex";
      dayPriceElements[1].style.display = "none";
    } else if (dayElement.classList.contains("selected-end-date")) {
      dayElement.classList.remove("selected-end-date");
      dayPriceElements[0].style.display = "flex";
      dayPriceElements[1].style.display = "none";

      isRevertingDayStyles = false;
    } else {
      isRevertingDayStyles = false;
    }
  }
};
