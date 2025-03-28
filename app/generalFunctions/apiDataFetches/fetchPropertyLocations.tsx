"use server";

import { wpApiUrl } from "@/app/constants/wpApiUrl";
import { fetchOriginHeader } from "../devToPro/useDevOrigin";

const fetchPropertyLocations = async () => {
  const propertyLocationsResponse = await fetch(
    `${wpApiUrl}kstpm_locations?_embed`,
    {
      method: "GET",
      headers: {
        Origin: fetchOriginHeader,
      },
    }
  );
  const fetchedPropertyLocations = await propertyLocationsResponse.json();

  return fetchedPropertyLocations;
};

export { fetchPropertyLocations };
