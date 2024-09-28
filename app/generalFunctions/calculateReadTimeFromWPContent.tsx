import { stripHtml } from "string-strip-html";

export const calculateReadTimeFromWPContent = (wpContent: string) => {
  const contentStrippedTags = stripHtml(wpContent)
    .result.replace(/\n/g, "")
    .replace(/\./g, " ")
    .replace(/\,/g, "")
    .replace(/\:/g, " ")
    .replace(/\"/g, "");
  const wordCount = contentStrippedTags.split(" ").length;
  const readingTime = Math.ceil(wordCount / 200);

  return readingTime;
};
