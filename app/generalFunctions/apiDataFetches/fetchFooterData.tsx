import { FooterData } from "@/app/types/footerData";
import { LinkData } from "@/app/types/linkData";
import { fetchPropertyLocations } from "@/app/generalFunctions/apiDataFetches/fetchPropertyLocations";
import { useHttpProtocol } from "../devToPro/useHttpProtocol";
import { useDevOrigin } from "../devToPro/useDevOrigin";

export const fetchFooterData = async () => {
  const footerData = await fetchPropertyLocations().then(async (data) => {
    const social_communications_res = await fetch(
      `${useHttpProtocol}${useDevOrigin}wordpress/wp-json/kst/social-communications`
    );
    const social_communications_json = await social_communications_res.json();

    const frontendEmail = social_communications_json.frontendEmail;
    const frontendPhoneNumber = social_communications_json.frontendPhoneNumber;
    const facebookLink = social_communications_json.facebookLink;
    const instagramLink = social_communications_json.instagramLink;

    const rentals: LinkData[] = [
      ...data.map(
        (location: { title: { rendered: string }; slug: string }) => ({
          text: location.title.rendered,
          color: "whitesmoke",
          href: `/location/${location.slug}`,
        })
      ),
      {
        text: "View all on map",
        href: `/map`,
        color: "",
      },
    ];

    let listWithMH: LinkData[] = data
      .filter(
        (location: { meta: { services_data: { management: string } } }) =>
          location.meta.services_data.management === "true"
      )
      .map((location: { title: { rendered: string }; slug: string }) => ({
        text: location.title.rendered,
        color: "whitesmoke",
        href: `/list-property/${location.slug}`,
      }));

    const footerData: FooterData = {
      content1: {
        subscribe: {
          headerText: "Newsletter",
          inputPlaceholder: "Your Email",
          buttonText: "Subscribe",
          extra: {
            labelText: "I am a:",
            options: ["Renter", "Owner", "Buyer"],
          },
        },
        connectHeader: "Connect",
        connectLinks: [
          {
            text: "Facebook",
            href: facebookLink,
            color: "",
          },
          {
            text: "Instagram",
            href: instagramLink,
            color: "",
          },
          {
            text: "Call Us",
            href: `tel:${frontendPhoneNumber}`,
            color: "",
          },
          {
            text: "Email Us",
            href: `mailto:${frontendEmail}`,
            color: "",
          },
        ],
      },

      content2: {
        headerText: "Stay",
        links: rentals,
      },

      content3: {
        box1: {
          headerText: "Manage",
          links: listWithMH,
        },
        box2: {
          headerText: "Company",
          links: [
            // {
            //   text: "Careers",
            //   href: `/careers`,
            //   color: "",
            // },
            {
              text: "Blog",
              href: `/blog`,
              color: "",
            },
          ],
        },
      },
    };

    return footerData;
  });

  return footerData;
};
