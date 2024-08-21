export const updateCalendarAlertBoxElement = (
  text: string,
  style: {
    color: string;
    backgroundColor: string;
    padding: string;
    margin: string;
  }
) => {
  let alertBoxElement = document.getElementsByClassName(
    "kst-check-in-out-calendar-alert-block"
  )[0] as HTMLDivElement;

  alertBoxElement.style.color = style.color;
  alertBoxElement.style.backgroundColor = style.backgroundColor;
  alertBoxElement.style.padding = style.padding;
  alertBoxElement.style.margin = style.margin;

  alertBoxElement.innerText = text;
};
