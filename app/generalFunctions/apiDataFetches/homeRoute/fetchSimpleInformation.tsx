import { SimpleInformationDataArray } from "@/app/types/simpleInformationData";

export const fetchSimpleInformationArray = () => {
  const fetchedSimpleInformationArray: SimpleInformationDataArray =
    Object.values(
      JSON.parse(
        window.wpCustomizerThemeSettings.homePageInformationCarouselData,
        function (key, value) {
          if (key === "img_url") {
            this.imageUrl = value;
          } else if (key === "summary") {
            this.information = value;
          } else {
            return value;
          }
        }
      )
    );

  return fetchedSimpleInformationArray;
};
