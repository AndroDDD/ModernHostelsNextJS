import { SingleItemSectionData } from "@/app/types/singleItemSectionData";

export const fetchSingleItemSectionData = (
  index: number
): SingleItemSectionData => {
  const fetchedSingleItemSectionData = JSON.parse(
    window.wpCustomizerThemeSettings[
      `locationAndPropertyLinksSectionData${index}`
    ],
    function (key, value) {
      if (key === "image_url") {
        this.imageUrl = value;
      } else if (key === "location_link") {
        this.viewCollectionLink = {
          text: "View Collection",
          href: value,
          color: "",
        };
      } else if (key === "property_link") {
        this.viewItemLink = {
          text: "View Property",
          href: value,
          color: "",
        };
      } else {
        return value;
      }
    }
  );

  return fetchedSingleItemSectionData;
};
