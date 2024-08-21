import { CollageSectionData } from "../../../types/collageSectionData";

export const fetchImageCollageSectionData = (): CollageSectionData => {
  const fetchedCollageSectionData = JSON.parse(
    window.wpCustomizerThemeSettings.imageCollageSectionData
  );

  return fetchedCollageSectionData;
};
