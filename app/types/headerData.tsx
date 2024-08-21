import { LinkData } from "@/app/types/linkData";

export type HeaderData = DynamicHeaderMenuItemsData & {
  homeButton: {
    text: string;
    imgUrl: string;
  };

  middleLink: LinkData;
};

export type DynamicHeaderMenuItemsData = {
  dropdownMenu1: {
    title: string;
    links: LinkData[];
  };
  dropdownMenu2?: {
    title: string;
    links: LinkData[];
  };
  contact: {
    phone: string;
    email: string;
  };
};
