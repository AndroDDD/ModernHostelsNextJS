export const convertNumberToDate = (number: number | string) => {
  console.log({ numberTest: number });
  const numberFlattened = Number(number);
  const formattedDate = new Date(numberFlattened).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return formattedDate;
};

export const convertHyphenDateToNamedDate = (hyphenDate: string) => {
  console.log({ hyphenDate });
  const formattedDate = new Date(`${hyphenDate}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  return formattedDate;
};
