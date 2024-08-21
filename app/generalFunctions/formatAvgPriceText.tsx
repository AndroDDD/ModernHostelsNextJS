export const formatAvgPriceText = (priceText: string) => {
  const priceTextSplitted = priceText.split("/");

  let formattedPriceText = ["", ""];

  if (priceTextSplitted.length === 2) {
    let priceNumber = priceTextSplitted[0].trim();
    let perText = priceTextSplitted[1].trim();

    formattedPriceText[1] = priceNumber;
    formattedPriceText[0] = perText;
  } else {
    formattedPriceText[1] = priceTextSplitted[0].trim();
    formattedPriceText[0] = "month";
  }

  return formattedPriceText;
};
