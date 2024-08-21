export const toggleCalendarApplyButton = (isDisabled: boolean = true) => {
  const applyButtonElement = document.getElementsByClassName(
    "kst-check-in-out-calendar-actions-apply"
  )[0] as HTMLDivElement;

  if (isDisabled) {
    applyButtonElement.classList.remove("enabled");
  } else {
    applyButtonElement.classList.add("enabled");
  }
};
