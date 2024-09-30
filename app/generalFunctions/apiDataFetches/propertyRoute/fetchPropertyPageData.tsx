import { PropertyPageData } from "@/app/types/propertyPageData";
import { RatingData } from "@/app/types/ratingsData";
import { wpApiUrl } from "@/app/constants/wpApiUrl";
import { formatSnakeCaseToCamelCase } from "@/app/generalFunctions/formatSnakeCaseToCamelCase";
import { generatePropertyPageAmenitiesList } from "@/app/generalFunctions/generatePropertyPageAmenitiesList";
import { calculateAverageRating } from "../../calculateRatings";

var he = require("he");

export const fetchPropertyPageData = async (propertyPageSlug: string) => {
  const propertyResponse = await fetch(
    `${wpApiUrl}kstpm_properties?_embed&slug=${propertyPageSlug}`,
    {
      method: "GET",
    }
  );
  const fetchedProperty = (await propertyResponse.json())[0];

  const generatedPropertyPageData =
    generatePropertyPageDataFromFetchedResponse(fetchedProperty);

  return generatedPropertyPageData;
};

const generatePropertyPageDataFromFetchedResponse = (fetchedPropertyData: {
  slug: string;
  title: { rendered: string };
  meta: {
    living_space_data: {
      about_the_space: {
        title: string;
        summary: string;
      };
      spaces: {
        calendar_space_id: string;
        label: string;
        show_displays: boolean;
        is_rentable: boolean;
        displays: {
          title: string;
          description: string;
          img_url: string;
        }[];
      }[];
      number_of_beds: number;
      number_of_bathrooms: number;
      number_of_guestrooms: number;
      number_of_workstations: number;
      amenities: {
        summary: string;
        list: string[];
      };
      snapshots: {
        content: string;
        icon: string;
        title: string;
      }[];
      workstations: {
        summary: string;
        list: string[];
      };
    };
    rental_length_data: {
      is_monthly: boolean;
      is_nightly: boolean;
      minimum_days_stay: number;
    };
    image_galleries_data: {
      featured_images: string[];
      living: string[];
      outdoors: string[];
      sleeping: string[];
      eating: string[];
      working: string[];
    };
    price_data: {
      avg_price_per_night: number;
    };
    the_neighborhood_data: {
      bars_and_pubs: {
        img_url: string;
        name: string;
        location: {
          street: string;
          zip_code: string;
          lat_long: {
            lat: number;
            lng: number;
          };
          distance: number;
        };
      }[];
      local_attractions: {
        img_url: string;
        name: string;
        location: {
          street: string;
          zip_code: string;
          lat_long: {
            lat: number;
            lng: number;
          };
          distance: number;
        };
      }[];
      restaurants: {
        img_url: string;
        name: string;
        location: {
          street: string;
          zip_code: string;
          lat_long: {
            lat: number;
            lng: number;
          };
          distance: number;
        };
      }[];
      shopping: {
        img_url: string;
        name: string;
        location: {
          street: string;
          zip_code: string;
          lat_long: {
            lat: number;
            lng: number;
          };
          distance: number;
        };
      }[];
    };
    policies_data: {
      cancellation_policy: string;
      security_deposit_policy: string;
    };
    ratings_data: {
      average_rating: number;
      accuracy_rating: RatingData[];
      cleanliness_rating: RatingData[];
      location_rating: RatingData[];
      check_in_rating: RatingData[];
      support_rating: RatingData[];
      value_rating: RatingData[];
      reviews: {
        reviewer_name: string;
        date_submitted: string;
        the_review: string;
      }[];
    };
  };
  _embedded: {
    ["wp:featured_media"]: {
      source_url: string;
    }[];
  };
}) => {
  let amenitiesFormattedToObject: {
    [key: string]: boolean;
    kitchen: boolean;
    airConditioning: boolean;
    television: boolean;
    washerAndDryer: boolean;
    heating: boolean;
    cable: boolean;
    computerMonitor: boolean;
    bedding: boolean;
    cookware: boolean;
    tableware: boolean;
    iron: boolean;
    pool: boolean;
    linens: boolean;
    wifi: boolean;
  } = {
    kitchen: false,
    airConditioning: false,
    television: false,
    washerAndDryer: false,
    heating: false,
    cable: false,
    computerMonitor: false,
    bedding: false,
    cookware: false,
    tableware: false,
    iron: false,
    pool: false,
    linens: false,
    wifi: false,
  };

  if (
    fetchedPropertyData.meta.living_space_data &&
    fetchedPropertyData.meta.living_space_data.amenities &&
    fetchedPropertyData.meta.living_space_data.amenities.list
  ) {
    fetchedPropertyData.meta.living_space_data.amenities.list.forEach(
      (amenity) => {
        const formattedAmenityName = formatSnakeCaseToCamelCase(amenity);

        if (formattedAmenityName in amenitiesFormattedToObject) {
          amenitiesFormattedToObject[formattedAmenityName] = true;
        }
      }
    );
  }

  const generatedPropertyPageData: PropertyPageData = {
    pageSlug: fetchedPropertyData.slug,

    nameOfProperty: fetchedPropertyData.title.rendered,

    headerSection: {
      title: he.decode(fetchedPropertyData.title.rendered),

      summary: [
        {
          numberOfReviews:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.reviews
              ? fetchedPropertyData.meta.ratings_data.reviews.length
              : 0,
          numberOfStars:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.average_rating
              ? fetchedPropertyData.meta.ratings_data.average_rating
              : 0,
        },
        {
          statName: "Guests",
          statNumber:
            fetchedPropertyData.meta.living_space_data &&
            fetchedPropertyData.meta.living_space_data.number_of_guestrooms
              ? fetchedPropertyData.meta.living_space_data.number_of_guestrooms
              : 0,
        },
        {
          statName: "Bedrooms",
          statNumber:
            fetchedPropertyData.meta.living_space_data &&
            fetchedPropertyData.meta.living_space_data.number_of_beds
              ? fetchedPropertyData.meta.living_space_data.number_of_beds
              : 0,
        },
        {
          statName: "Bathrooms",
          statNumber:
            fetchedPropertyData.meta.living_space_data &&
            fetchedPropertyData.meta.living_space_data.number_of_bathrooms
              ? fetchedPropertyData.meta.living_space_data.number_of_bathrooms
              : 0,
        },
        {
          statName: "Offices",
          statNumber:
            fetchedPropertyData.meta.living_space_data &&
            fetchedPropertyData.meta.living_space_data.number_of_workstations
              ? fetchedPropertyData.meta.living_space_data
                  .number_of_workstations
              : 0,
        },
        {
          statName: "Day Min. Stay",
          statNumber:
            fetchedPropertyData.meta.rental_length_data &&
            fetchedPropertyData.meta.rental_length_data.minimum_days_stay
              ? fetchedPropertyData.meta.rental_length_data.minimum_days_stay
              : 0,
        },
      ],

      link: {
        text: "View on map",
        href: `/map?property=${fetchedPropertyData.slug}`,
        color: "darkcyan",
      },
    },

    imageCollageSection: {
      imageUrls:
        fetchedPropertyData.meta.image_galleries_data &&
        fetchedPropertyData.meta.image_galleries_data.featured_images
          ? fetchedPropertyData.meta.image_galleries_data.featured_images
          : [],
    },

    overviewSection: {
      propertyPageSlug: fetchedPropertyData.slug,

      propertyName: fetchedPropertyData.title.rendered,

      propertyImageUrl:
        fetchedPropertyData.meta.image_galleries_data &&
        fetchedPropertyData.meta.image_galleries_data.featured_images &&
        fetchedPropertyData.meta.image_galleries_data.featured_images.length > 0
          ? fetchedPropertyData.meta.image_galleries_data.featured_images[0]
          : "",

      numberOfBeds:
        fetchedPropertyData.meta.living_space_data &&
        fetchedPropertyData.meta.living_space_data.number_of_beds
          ? fetchedPropertyData.meta.living_space_data.number_of_beds
          : 0,

      numberOfBaths:
        fetchedPropertyData.meta.living_space_data &&
        fetchedPropertyData.meta.living_space_data.number_of_bathrooms
          ? fetchedPropertyData.meta.living_space_data.number_of_bathrooms
          : 0,

      propertyPrice:
        fetchedPropertyData.meta.price_data &&
        fetchedPropertyData.meta.price_data.avg_price_per_night
          ? fetchedPropertyData.meta.price_data.avg_price_per_night.toString()
          : "0",

      headerTitle: "Overview",

      snapShots:
        fetchedPropertyData.meta.living_space_data &&
        fetchedPropertyData.meta.living_space_data.snapshots
          ? fetchedPropertyData.meta.living_space_data.snapshots.map(
              (snapshot) => ({
                title: snapshot.title,
                summary: snapshot.content,
                icon: formatSnakeCaseToCamelCase(snapshot.icon),
              })
            )
          : [],

      aboutTheSpace: {
        title:
          fetchedPropertyData.meta.living_space_data &&
          fetchedPropertyData.meta.living_space_data.about_the_space &&
          fetchedPropertyData.meta.living_space_data.about_the_space.title
            ? fetchedPropertyData.meta.living_space_data.about_the_space.title
            : "",
        summary:
          fetchedPropertyData.meta.living_space_data &&
          fetchedPropertyData.meta.living_space_data.about_the_space &&
          fetchedPropertyData.meta.living_space_data.about_the_space.summary
            ? fetchedPropertyData.meta.living_space_data.about_the_space.summary
            : "",
      },

      spaces:
        fetchedPropertyData.meta.living_space_data &&
        fetchedPropertyData.meta.living_space_data.spaces
          ? fetchedPropertyData.meta.living_space_data.spaces
          : [],

      amenitiesSummary:
        fetchedPropertyData.meta.living_space_data &&
        fetchedPropertyData.meta.living_space_data.amenities &&
        fetchedPropertyData.meta.living_space_data.amenities.summary
          ? fetchedPropertyData.meta.living_space_data.amenities.summary
          : "",

      amenitiesList: generatePropertyPageAmenitiesList(
        amenitiesFormattedToObject
      ),

      workstationsSummary:
        fetchedPropertyData.meta.living_space_data &&
        fetchedPropertyData.meta.living_space_data.workstations &&
        fetchedPropertyData.meta.living_space_data.workstations.summary
          ? fetchedPropertyData.meta.living_space_data.workstations.summary
          : "",

      workstationsList:
        fetchedPropertyData.meta.living_space_data &&
        fetchedPropertyData.meta.living_space_data.number_of_workstations &&
        fetchedPropertyData.meta.living_space_data.workstations.list
          ? fetchedPropertyData.meta.living_space_data.workstations.list
          : [],
    },

    categorizedImagesSection: {
      Outdoors:
        fetchedPropertyData.meta.image_galleries_data &&
        fetchedPropertyData.meta.image_galleries_data.outdoors
          ? fetchedPropertyData.meta.image_galleries_data.outdoors
          : [],
      Sleeping:
        fetchedPropertyData.meta.image_galleries_data &&
        fetchedPropertyData.meta.image_galleries_data.sleeping
          ? fetchedPropertyData.meta.image_galleries_data.sleeping
          : [],
      Living:
        fetchedPropertyData.meta.image_galleries_data &&
        fetchedPropertyData.meta.image_galleries_data.living
          ? fetchedPropertyData.meta.image_galleries_data.living
          : [],
      Eating:
        fetchedPropertyData.meta.image_galleries_data &&
        fetchedPropertyData.meta.image_galleries_data.eating
          ? fetchedPropertyData.meta.image_galleries_data.eating
          : [],
      Working:
        fetchedPropertyData.meta.image_galleries_data &&
        fetchedPropertyData.meta.image_galleries_data.working
          ? fetchedPropertyData.meta.image_galleries_data.working
          : [],
    },

    cancellationPolicySection: {
      headerTitle: "Rental Policies",
      cancellationPolicy:
        fetchedPropertyData.meta.policies_data &&
        fetchedPropertyData.meta.policies_data.cancellation_policy
          ? fetchedPropertyData.meta.policies_data.cancellation_policy
          : "",
      securityDepositPolicy:
        fetchedPropertyData.meta.policies_data &&
        fetchedPropertyData.meta.policies_data.security_deposit_policy
          ? fetchedPropertyData.meta.policies_data.security_deposit_policy
          : "",
      respondToEmail: "reachout@modernhostels.com",
    },

    theNeighborhoodSection: {
      title: "The Neighborhood",

      mapSnapshotUrl: "",

      locations: {
        Shopping:
          fetchedPropertyData.meta.the_neighborhood_data &&
          fetchedPropertyData.meta.the_neighborhood_data.shopping
            ? fetchedPropertyData.meta.the_neighborhood_data.shopping.map(
                (item) => ({
                  name: item.name,
                  imgUrl: item.img_url,
                  milesAway: item.location.distance,
                  latLong: item.location.lat_long,
                })
              )
            : [],
        Restaurants:
          fetchedPropertyData.meta.the_neighborhood_data &&
          fetchedPropertyData.meta.the_neighborhood_data.restaurants
            ? fetchedPropertyData.meta.the_neighborhood_data.restaurants.map(
                (item) => ({
                  name: item.name,
                  imgUrl: item.img_url,
                  milesAway: item.location.distance,
                  latLong: item.location.lat_long,
                })
              )
            : [],
        "Bars and Pubs":
          fetchedPropertyData.meta.the_neighborhood_data &&
          fetchedPropertyData.meta.the_neighborhood_data.bars_and_pubs
            ? fetchedPropertyData.meta.the_neighborhood_data.bars_and_pubs.map(
                (item) => ({
                  name: item.name,
                  imgUrl: item.img_url,
                  milesAway: item.location.distance,
                  latLong: item.location.lat_long,
                })
              )
            : [],
        "Local Attractions":
          fetchedPropertyData.meta.the_neighborhood_data &&
          fetchedPropertyData.meta.the_neighborhood_data.local_attractions
            ? fetchedPropertyData.meta.the_neighborhood_data.local_attractions.map(
                (item) => ({
                  name: item.name,
                  imgUrl: item.img_url,
                  milesAway: item.location.distance,
                  latLong: item.location.lat_long,
                })
              )
            : [],
      },
    },

    reviewsSection: {
      numberOfReviews:
        fetchedPropertyData.meta.ratings_data &&
        fetchedPropertyData.meta.ratings_data.reviews
          ? fetchedPropertyData.meta.ratings_data.reviews.length
          : 0,

      numberOfStars:
        fetchedPropertyData.meta.ratings_data &&
        fetchedPropertyData.meta.ratings_data.average_rating
          ? fetchedPropertyData.meta.ratings_data.average_rating
          : 0,

      otherStats: [
        {
          statName: "Accuracy",
          numberOfStars:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.accuracy_rating
              ? calculateAverageRating(
                  fetchedPropertyData.meta.ratings_data.accuracy_rating
                )
              : 0,
        },
        {
          statName: "Cleanliness",
          numberOfStars:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.cleanliness_rating
              ? calculateAverageRating(
                  fetchedPropertyData.meta.ratings_data.cleanliness_rating
                )
              : 0,
        },

        {
          statName: "Location",
          numberOfStars:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.location_rating
              ? calculateAverageRating(
                  fetchedPropertyData.meta.ratings_data.location_rating
                )
              : 0,
        },
        {
          statName: "Check-in",
          numberOfStars:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.check_in_rating
              ? calculateAverageRating(
                  fetchedPropertyData.meta.ratings_data.check_in_rating
                )
              : 0,
        },
        {
          statName: "Support",
          numberOfStars:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.support_rating
              ? calculateAverageRating(
                  fetchedPropertyData.meta.ratings_data.support_rating
                )
              : 0,
        },
        {
          statName: "Value",
          numberOfStars:
            fetchedPropertyData.meta.ratings_data &&
            fetchedPropertyData.meta.ratings_data.value_rating
              ? calculateAverageRating(
                  fetchedPropertyData.meta.ratings_data.value_rating
                )
              : 0,
        },
      ],

      testimonials:
        fetchedPropertyData.meta.ratings_data &&
        fetchedPropertyData.meta.ratings_data.reviews
          ? fetchedPropertyData.meta.ratings_data.reviews.map((review) => ({
              from: review.reviewer_name,
              date: review.date_submitted,
              review: review.the_review,
            }))
          : [],
    },

    alsoViewedSection: {
      title: "Renters also viewed these properties",
      properties: [],
    },
  };

  console.log({ generatedPropertyPageData });

  return generatedPropertyPageData;
};
