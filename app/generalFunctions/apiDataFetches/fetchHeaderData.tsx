import { LinkData } from "@/app/types/linkData";
import { fetchPropertyLocations } from "@/app/generalFunctions/apiDataFetches/fetchPropertyLocations";
import { socialCommunicationsUrl } from "@/app/constants/wpApiUrl";
import { getLogoUrl } from "@/app/constants/wpApiUrl";

export const fetchHeaderData = async () => {
  const fetchedHeaderData = await fetchPropertyLocations().then(
    async (data) => {
      const rentals: LinkData[] = [
        ...data
          .splice(0, 5)
          .map((location: { title: { rendered: string }; slug: string }) => ({
            text: location.title.rendered,
            color: "whitesmoke",
            href: `/location/${location.slug}`,
          })),
        {
          text: "View all on map",
          href: `/map`,
          color: "cyan",
        },
      ];

      let listWithMH: LinkData[] = data
        .filter(
          (location: { meta: { services_data: { management: string } } }) =>
            location.meta.services_data.management === "true"
        )
        .splice(0, 5)
        .map((location: { title: { rendered: string }; slug: string }) => ({
          text: location.title.rendered,
          color: "whitesmoke",
          href: `/list-property/${location.slug}`,
        }));

      const social_communications_res = await fetch(socialCommunicationsUrl);
      const social_communications_json = await social_communications_res.json();

      const frontendEmail = social_communications_json.frontendEmail;
      const frontendPhoneNumber =
        social_communications_json.frontendPhoneNumber;

      const getLogoUrlResponse = await fetch(getLogoUrl);
      const getLogoUrlJson = await getLogoUrlResponse.json();

      return {
        homeButton: {
          text: "Modern Hostels",
          imgUrl: getLogoUrlJson["logoUrl"],
        },
        middleLink: {
          text: "Blog",
          color: "whitesmoke",
          href: "/blog",
        },
        dropdownMenu1: {
          title: "Browse Rentals",
          links: rentals,
        },
        dropdownMenu2: {
          title: "List with MH",
          links: listWithMH,
        },
        contact: {
          phone: frontendPhoneNumber,
          email: frontendEmail,
        },
      };
    }
  );

  return fetchedHeaderData;
};
