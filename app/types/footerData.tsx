import { LinkData } from "./linkData";

export type FooterData = {
  content1: {
    subscribe: {
      headerText: string;
      inputPlaceholder: string;
      buttonText: string;
      extra: {
        labelText: string;
        options: string[];
      };
    };

    connectHeader: string;

    connectLinks: LinkData[];
  };
  content2: {
    headerText: string;
    links: LinkData[];
  };
  content3: {
    box1: {
      headerText: string;
      links: LinkData[];
    };

    box2: {
      headerText: string;
      links: LinkData[];
    };
  };
};
