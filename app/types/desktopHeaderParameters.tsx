import { HeaderData } from "./headerData";

export type DesktopHeaderParameters = {
  isScrolled: boolean;
  content: HeaderData;
  style?: string;
  headerRef?: React.MutableRefObject<HTMLElement | null>;
};
