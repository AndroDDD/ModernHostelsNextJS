"use server";

import { footerSeparatorImageApiUrl } from "@/app/constants/wpApiUrl";
import { fetchOriginHeader } from "../devToPro/useDevOrigin";

export const fetchFooterSeparatorImageURL = async () => {
  console.log({ footerSeparatorImageApiUrl });
  const response = await fetch(footerSeparatorImageApiUrl, {
    method: "GET",
    headers: {
      Origin: fetchOriginHeader,
    },
  });
  const json = await response.json();
  const url = json["url"];

  return url;
};
