import { IntroSectionData } from "@/app/types/introSectionData";

export const fetchIntroSectionData = (): IntroSectionData => {
  const fetchedIntroSectionData = JSON.parse(
    window.wpCustomizerThemeSettings.homePageIntroSectionData,
    function (key, value) {
      if (key === "background_image_url") {
        this.backgroundImageUrl = value;
      } else if (key === "hero_title") {
        this.title = value;
      } else if (key === "sub_text") {
        this.subText = value;
      } else if (key === "right_button_text") {
        this.rightButtonTitle = value;
      } else if (key === "menu_title") {
        this.dropdownMenuTitle = value;
      } else if (key === "menu_items") {
        this.dropdownMenuItems = Object.values(
          value as { name: string; slug: string }[]
        ).map((item: { name: string; slug: string }) => ({
          name: item.name,
          pageSlug: item.slug,
        }));
      } else {
        return value;
      }
    }
  );

  return fetchedIntroSectionData;
};
