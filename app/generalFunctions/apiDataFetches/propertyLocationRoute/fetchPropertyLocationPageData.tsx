import { LocationPageData } from "@/app/types/locationPageData";
import { fetchPropertyLocations } from "@/app/generalFunctions/apiDataFetches/fetchPropertyLocations";
import { wpApiUrl } from "@/app/constants/wpApiUrl";
import { AmenitiesList } from "@/app/types/propertyData";
import { formatSnakeCaseToCamelCase } from "@/app/generalFunctions/formatSnakeCaseToCamelCase";

var he = require("he");

type FetchedLocationsResponse = {
  title: {
    rendered: string;
  };
  meta: {
    attractions_data: {
      img_url: string;
      summary: string;
      title: string;
    }[];
    faqs_data: {
      question: string;
      answer: string;
    }[];
    location_data: {
      country: string;
      state: string;
      city: string;
      lat_long: { lat: number; lng: number };
    };
    properties_data: number[];
    services_data: {
      management: string;
    };
    short_summary_data: {
      title: string;
      summary: string;
    };
  };
  _embedded: {
    ["wp:featuredmedia"]: {
      source_url: string;
    }[];
  };
  slug: string;
}[];

type FetchedPropertiesResponse = {
  id: number;
  title: { rendered: string };
  meta: {
    location_data: {
      city: string;
      country: string;
      state: string;
      street: string;
      zip_code: string;
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
}[];

export const fetchPropertyLocationPageData = async (location: string) => {
  const fetchedLocations =
    (await fetchPropertyLocations()) as FetchedLocationsResponse;

  const fetchedLocation = fetchedLocations.find(
    (locationToCheck) => locationToCheck.slug === location
  );

  console.log({
    fetchedLocation,
    meta: fetchedLocation?.meta,
    latLong: fetchedLocation?.meta.location_data.lat_long,
  });
  const locationFeaturedImage = fetchedLocation?._embedded["wp:featuredmedia"]
    ? fetchedLocation._embedded["wp:featuredmedia"][0].source_url
    : "";
  const otherLocations = fetchedLocations.filter(
    (locationToCheck) => locationToCheck.slug !== location
  );
  const latLong = fetchedLocation?.meta.location_data.lat_long;

  let formattedLocationPageData: LocationPageData = {
    introSection: {
      imgUrl: locationFeaturedImage,
      title: fetchedLocation?.title.rendered ?? "",
      button: {
        text: "View all on map",
        color: "black",
        href: `/map?market=${fetchedLocation?.slug}`,
      },
    },

    propertiesSection: {
      properties: [],
      button: {
        text: "View All on Map",
        color: "black",
        href: `/map?market=${fetchedLocation?.slug}`,
      },
    },

    mapSection: {
      title: fetchedLocation?.meta.short_summary_data.title ?? "",
      summary: fetchedLocation?.meta.short_summary_data.summary ?? "",
      latLong: latLong ?? {
        lat: 0,
        lng: 0,
      },
    },

    slideSection: {
      title: "Top sights and attractions",
      slides:
        fetchedLocation?.meta.attractions_data.map((attraction) => ({
          title: attraction.title,
          imgUrl: attraction.img_url,
          summary: attraction.summary,
        })) ?? [],
    },

    otherLocationsSection: {
      title: "Rentals in other cities",
      locations: otherLocations.map((otherLocation) => ({
        text: otherLocation.title.rendered,
        href: `/location/${otherLocation.slug}`,
        color: "whitesmoke",
      })),
    },

    faqSection: {
      title: `Short Term Rentals In ${fetchedLocation?.meta.location_data?.city} Made Easy`,
      questions:
        fetchedLocation?.meta.faqs_data.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        })) ?? [],
    },
  };

  if (fetchedLocation && fetchedLocation.meta.properties_data.length > 0) {
    const fetchedProperties = await Promise.all(
      fetchedLocation.meta.properties_data.map((propertyID) =>
        fetch(`${wpApiUrl}kstpm_properties/${propertyID}`).then((response) =>
          response.json()
        )
      )
    );

    const formattedLocationProperties = fetchedProperties.map(
      (fetchedProperty) => {
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

        return {
          propertyName: he.decode(fetchedProperty.title.rendered),
          price: `$${fetchedProperty.meta.price_data.avg_price_per_night} / night`,
          rating: 5,
          location: `${fetchedProperty.meta.location_data.city ?? ""}, ${
            fetchedProperty.meta.location_data.state ?? ""
          }`,
          latLong: {
            lat: fetchedProperty.meta.location_data.lat_long,
            lng: fetchedProperty.meta.location_data.lat_long,
          },
          available: Date.now().toString(),
          numberOfGuests:
            fetchedProperty.meta.living_space_data.number_of_guestrooms,
          numberOfBeds: fetchedProperty.meta.living_space_data.number_of_beds,
          numberOfBaths:
            fetchedProperty.meta.living_space_data.number_of_bathrooms,
          numberOfOffices:
            fetchedProperty.meta.living_space_data.number_of_workstations,
          amenities,
          images: fetchedProperty.meta.image_galleries_data.featured_images,
          isMonthly: fetchedProperty.meta.rental_length_data.is_monthly,
          isNightly: fetchedProperty.meta.rental_length_data.is_nightly,
          pageSlug: fetchedProperty.slug,
        };
      }
    );

    formattedLocationPageData.propertiesSection.properties =
      formattedLocationProperties;

    console.log({ formattedLocationPageData });
    return formattedLocationPageData;
  } else {
    console.log({ formattedLocationPageData });
    return formattedLocationPageData;
  }
};
