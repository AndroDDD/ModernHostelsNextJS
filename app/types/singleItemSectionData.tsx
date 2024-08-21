import { LinkData } from "@/app/types/linkData";

export type SingleItemSectionDataArray = SingleItemSectionData[];

export type SingleItemSectionData = {
  imageUrl: string;
  summary: string;
  viewItemLink: LinkData;
  viewCollectionLink: LinkData;
};
