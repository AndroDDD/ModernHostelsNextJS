import { HighlightsSectionData } from "../../../types/highlightsSectionData";

export const fetchHighlightSectionData = (): HighlightsSectionData => {
  const fetchedHighlightSectionData = JSON.parse(
    window.wpCustomizerThemeSettings.highlightsSectionData,
    function (key, value) {
      if (key === "background_image") {
        this.backgroundImageURL = value;
      } else if (key === "header_title") {
        this.headerTitle = value;
      } else if (key === "highlights") {
        return Object.values(value);
      } else {
        return value;
      }
    }
  );

  return fetchedHighlightSectionData;
};
