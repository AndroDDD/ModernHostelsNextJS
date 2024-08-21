export const reformatLocationString = (locationString: string): string => {
  let reformattedLocationString = "";

  for (let i = 0; i < locationString.length; i++) {
    if (locationString[i] === "-") {
      reformattedLocationString += " ";
    } else if (
      i === 0 ||
      (locationString[i - 1] && locationString[i - 1] === "-")
    ) {
      reformattedLocationString += locationString[i].toUpperCase();
    } else {
      reformattedLocationString += locationString[i];
    }
  }

  return reformattedLocationString;
};
