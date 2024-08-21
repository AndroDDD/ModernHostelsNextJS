const roundDecimal = (number: number, decimalPoints: number) => {
  const powerOfTen = Math.pow(10, decimalPoints);

  return Math.round(number * powerOfTen) / powerOfTen;
};

const addCommasToPrice = (dollars: string) => {
  let updatedPriceText = "";
  let indexReversed = 1;

  for (let i = dollars.length - 1; i >= 0; i--) {
    const isNextThirdNumber = indexReversed % 3 === 0;

    if (isNextThirdNumber && i > 0) {
      updatedPriceText += `${dollars[i]},`;
    } else {
      updatedPriceText += dollars[i];
    }

    indexReversed++;
  }

  const dollarsStringArray = updatedPriceText.split("");
  dollarsStringArray.reverse();

  updatedPriceText = dollarsStringArray.join("");

  return updatedPriceText;
};

const formatPriceText = (price: string): string => {
  let priceTextSplitByDecimal = price.split(".");
  let formattedPrice = "";

  if (priceTextSplitByDecimal.length === 1) {
    let dollars = priceTextSplitByDecimal[0];

    formattedPrice += addCommasToPrice(dollars);
  } else if (priceTextSplitByDecimal.length === 2) {
    let dollars = priceTextSplitByDecimal[0];

    formattedPrice += addCommasToPrice(dollars);

    let cents = priceTextSplitByDecimal[1];
    let centsToNumber = +cents;

    centsToNumber = roundDecimal(centsToNumber / Math.pow(10, cents.length), 2);

    cents = `${centsToNumber}`;
    cents = cents.split(".")[1];
    cents = cents.length < 2 ? `${cents}0` : cents;

    formattedPrice += `.${cents}`;
  }

  return formattedPrice;
};

export { formatPriceText };
