"use server";

import { fetchOriginHeader } from "../../devToPro/useDevOrigin";
import { wpAuthorizationHeaderValue } from "@/app/constants/wpFetchHeaders";

export async function fetchHomePageSettings(restUrl: string) {
  try {
    const restUrlResponse = await fetch(restUrl, {
      headers: {
        Origin: fetchOriginHeader,
        Authorization: wpAuthorizationHeaderValue,
      },
    });
    const json = await restUrlResponse.json();

    const laxDataFetch = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Resolved after ${500} milliseconds`);
      }, 500);
    });

    return json;
  } catch (e) {
    console.error("Error fetching homepage settings:", e);
    return null;
  }
}
