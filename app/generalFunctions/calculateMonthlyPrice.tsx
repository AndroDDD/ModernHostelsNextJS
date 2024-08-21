export const calculateMonthlyPrice = (priceText: string) => {
  const priceTextSplitted = priceText.split("/");

  let priceNumber = priceTextSplitted[0].trim();
  priceNumber = priceNumber[0] === "$" ? priceNumber.substring(1) : priceNumber;
  priceNumber = priceNumber.replace(",", "");

  if (priceTextSplitted.length === 2) {
    let perText = priceTextSplitted[1].trim().split(" ");

    if (perText.length === 2) {
      if (perText[1] === "months") {
        return +priceNumber / +perText[0];
      } else if (perText[1] === "nights") {
        return (+priceNumber / +perText[0]) * 30;
      }
    } else {
      if (perText[0] === "month") {
        return +priceNumber;
      } else if (perText[0] === "night") {
        return +priceNumber * 30;
      }
    }
  } else {
    return +priceTextSplitted[0];
  }
};
