"use server";

import { wpPropertyPriceDataApiUrl } from "@/app/constants/wpApiUrl";

export async function fetchPropertyPriceData(propertySlug: string) {
  const response = await fetch(
    `${wpPropertyPriceDataApiUrl}get/${propertySlug}`
  );
  const data = await response.json();

  console.log({ data });

  return data;
}
