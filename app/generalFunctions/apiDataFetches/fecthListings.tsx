import { AmenitiesList, Properties } from "@/app/types/propertyData";
import { wpApiUrl } from "@/app/constants/wpApiUrl";
import { fetchPropertyLocations } from "@/app/generalFunctions/apiDataFetches/fetchPropertyLocations";
import { formatSnakeCaseToCamelCase } from "@/app/generalFunctions/formatSnakeCaseToCamelCase";

const he = require("he");

export const fetchListings = async (callback?: Function) => {
  const finalResults = await fetchPropertyLocations()
    .then(
      (
        propertyLocations: {
          title: { rendered: string };
          meta: { properties_data: Number[] };
          slug: string;
        }[]
      ) => {
        let formattedLocationProperties: Properties = {};

        propertyLocations.forEach(async (location) => {
          formattedLocationProperties[location.title.rendered] = {
            pageSlug: location.slug,
            listings: [],
          };

          if (location.meta.properties_data.length > 0) {
            await Promise.all(
              location.meta.properties_data.map((propertyID) =>
                fetch(`${wpApiUrl}kstpm_properties/${propertyID}`).then(
                  (response) => response.json()
                )
              )
            ).then(
              (
                fetchedProperties: {
                  id: number;
                  title: { rendered: string };
                  meta: {
                    location_data: {
                      city: string;
                      country: string;
                      state: string;
                      street: string;
                      zip_code: string;
                      lat_long: {
                        lat: number;
                        lng: number;
                      };
                    };
                    living_space_data: {
                      number_of_bathrooms: number;
                      number_of_beds: number;
                      number_of_guestrooms: number;
                      number_of_workstations: number;
                      amenities: {
                        list: string[];
                      };
                    };
                    image_galleries_data: {
                      featured_images: string[];
                    };
                    rental_length_data: {
                      is_monthly: boolean;
                      is_nightly: boolean;
                    };
                    price_data: {
                      avg_price_per_night: number;
                    };
                  };
                  slug: string;
                }[]
              ) => {
                formattedLocationProperties[location.title.rendered] = {
                  ...formattedLocationProperties[location.title.rendered],
                  listings: fetchedProperties.map((fetchedProperty) => {
                    let amenities: AmenitiesList = {
                      ["kitchen"]: false,
                      ["airConditioning"]: false,
                      ["television"]: false,
                      ["washerAndDryer"]: false,
                      ["heating"]: false,
                      ["cable"]: false,
                      ["computerMonitor"]: false,
                      ["bedding"]: false,
                      ["cookware"]: false,
                      ["tableware"]: false,
                      ["iron"]: false,
                      ["pool"]: false,
                      ["linens"]: false,
                      ["wifi"]: false,
                    };

                    if (fetchedProperty.meta.living_space_data.amenities.list) {
                      fetchedProperty.meta.living_space_data.amenities.list.forEach(
                        (fetchedAmenity: string) => {
                          const formattedAmenityName =
                            formatSnakeCaseToCamelCase(fetchedAmenity);

                          amenities[formattedAmenityName] = true;
                        }
                      );
                    }

                    console.log({ fetchedProperty });

                    return {
                      propertyName: he.decode(
                        fetchedProperty.title.rendered ?? ""
                      ),
                      price: `$${
                        fetchedProperty.meta.price_data.avg_price_per_night ??
                        "UnDefined"
                      } / night`,
                      rating: 5,
                      location: fetchedProperty.meta.location_data
                        ? `${fetchedProperty.meta.location_data.city ?? ""}, ${
                            fetchedProperty.meta.location_data.state ?? ""
                          }`
                        : "",
                      latLong: fetchedProperty.meta.location_data
                        ? fetchedProperty.meta.location_data.lat_long ?? {}
                        : { lat: 0, lng: 0 },
                      available: Date.now().toString(),
                      numberOfGuests:
                        fetchedProperty.meta.living_space_data
                          .number_of_guestrooms ?? 0,
                      numberOfBeds:
                        fetchedProperty.meta.living_space_data.number_of_beds ??
                        0,
                      numberOfBaths:
                        fetchedProperty.meta.living_space_data
                          .number_of_bathrooms ?? 0,
                      numberOfOffices:
                        fetchedProperty.meta.living_space_data
                          .number_of_workstations ?? 0,
                      amenities,
                      images:
                        fetchedProperty.meta.image_galleries_data
                          .featured_images ?? [],
                      isMonthly:
                        fetchedProperty.meta.rental_length_data.is_monthly ??
                        "false",
                      isNightly:
                        fetchedProperty.meta.rental_length_data.is_nightly ??
                        "false",
                      pageSlug: fetchedProperty.slug ?? "",
                    };
                  }),
                };
              }
            );
          }
        });

        return formattedLocationProperties;
      }
    )
    .then((finalResults: Properties) => {
      if (callback) {
        callback(finalResults);
      }

      return finalResults;
    });

  return finalResults;
};
