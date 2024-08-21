export const convertPriceStringToNumber = (priceString: string) => {
  const priceStringSplitted = priceString.trim().split("/");

  let price = priceStringSplitted[0].trim();
  let per = priceStringSplitted[1].trim();
  let perSplitted = per.split(" ");
  let division = 1;

  price = price[0] === "$" ? price.slice(1) : price;
  price = price.replace(",", "");
  division =
    perSplitted.length === 2
      ? +perSplitted[0]
      : perSplitted[0] === "month"
      ? 30
      : 1;

  const flattenedPrice = +price / division;

  return flattenedPrice;
};
