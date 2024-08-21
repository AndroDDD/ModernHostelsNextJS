export type CollageSectionData = {
  header: CollageSectionHeader;
  images: CollageSectionImages;
};

export type CollageSectionHeader = {
  title: string;
  summary: string;
};

export type CollageSectionImages = string[];
