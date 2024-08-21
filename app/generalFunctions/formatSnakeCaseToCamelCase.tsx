export const formatSnakeCaseToCamelCase = (text: string): string => {
  let formattedString = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "_") {
      formattedString += text[i + 1].toUpperCase();
      i++;
    } else {
      formattedString += text[i];
    }
  }

  return formattedString;
};
