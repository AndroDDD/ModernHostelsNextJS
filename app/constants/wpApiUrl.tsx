import { useHttpProtocol } from "../generalFunctions/devToPro/useHttpProtocol";
import {
  placeXAMPPHostname,
  placeXAMPPUrl,
} from "@/app/generalFunctions/devToPro/replaceWithXAMPPUrl";

const wpApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/wp/v2/`;
const wpPropertyPriceDataApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kst/v1/price-data/`;
const wpLocationsApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kst/v1/locations/`;
const wpPropertyCalendarApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kst/v1/calendar/`;
const blogPostsUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/wp/v2/ai_blog_posts/`;
const emailServerUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kst/sendContactForm/`;
const getLogoUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kst/get-logo-url/`;
const newsletterApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kst/v1/newsletter/`;
const homepageSettingsApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kst/homepage-settings`;

export {
  wpApiUrl,
  wpPropertyPriceDataApiUrl,
  wpLocationsApiUrl,
  wpPropertyCalendarApiUrl,
  blogPostsUrl,
  emailServerUrl,
  getLogoUrl,
  newsletterApiUrl,
  homepageSettingsApiUrl,
};
