"use server";

import { wpPropertyPriceDataApiUrl } from "@/app/constants/wpApiUrl";
import { fetchOriginHeader } from "../devToPro/useDevOrigin";

export async function fetchPropertyPriceData(propertySlug: string) {
  const response = await fetch(
    `${wpPropertyPriceDataApiUrl}get/${propertySlug}`,
    {
      method: "GET",
      headers: {
        Origin: fetchOriginHeader,
      },
    }
  );
  const data = await response.json();

  console.log({ data });

  return data;
}
