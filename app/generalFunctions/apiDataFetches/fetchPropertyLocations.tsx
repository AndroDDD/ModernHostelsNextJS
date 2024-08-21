import { wpApiUrl } from "@/app/constants/wpApiUrl";

const fetchPropertyLocations = async () => {
  const propertyLocationsResponse = await fetch(
    `${wpApiUrl}kstpm_locations?_embed`,
    {
      method: "GET",
    }
  );
  const fetchedPropertyLocations = await propertyLocationsResponse.json();

  return fetchedPropertyLocations;
};

export { fetchPropertyLocations };
