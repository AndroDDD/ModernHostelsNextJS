export const generateDayElementConditionalStyling = (
  thisDayEpochTime: number,
  checkInDateEpochTime: number,
  checkOutDateEpochTime: number,
  minimumStayDateEpochTime?: number
) => {
  let conditionalStyling = {
    containerSelectedClassName: "",
    priceDisplay: {
      static: {
        display: "flex",
      },
      dynamic: {
        display: "none",
      },
    },
  };

  if (thisDayEpochTime === checkInDateEpochTime) {
    conditionalStyling.containerSelectedClassName = "selected-start-date";
    conditionalStyling.priceDisplay.static.display = "none";
    conditionalStyling.priceDisplay.dynamic.display = "flex";
  } else if (thisDayEpochTime === checkOutDateEpochTime) {
    conditionalStyling.containerSelectedClassName = "selected-end-date";
    conditionalStyling.priceDisplay.static.display = "flex";
    conditionalStyling.priceDisplay.dynamic.display = "none";
  } else if (
    thisDayEpochTime > checkInDateEpochTime &&
    (thisDayEpochTime < checkOutDateEpochTime ||
      (minimumStayDateEpochTime &&
        thisDayEpochTime <= minimumStayDateEpochTime))
  ) {
    conditionalStyling.containerSelectedClassName = "in-between-selected-date";
    conditionalStyling.priceDisplay.static.display = "none";
    conditionalStyling.priceDisplay.dynamic.display = "flex";
  }

  return conditionalStyling;
};
