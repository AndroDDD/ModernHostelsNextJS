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
const checkoutSubmitOrderApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/orders/submit`;
const createCustomerApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/customer/create`;
const updateCustomerApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/customer/update`;
const customerOrdersApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/orders`;
const customerRewardsTierApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/rewards/rental/tiers/all`;
const customerRewardsApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/rewards/rental/customer`;
const customersDataApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/customers`;
const customerDataApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/customer`;
const getUserChatMessagesApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/chat/get-messages`;
const getUserChatConversationIdsApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/chat/get-conversation-ids`;
const sendUserChatMessageApiUrl = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}wp-json/kstecm/v1/chat/send-message`;

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
  checkoutSubmitOrderApiUrl,
  createCustomerApiUrl,
  updateCustomerApiUrl,
  customerOrdersApiUrl,
  customerRewardsTierApiUrl,
  customerRewardsApiUrl,
  customersDataApiUrl,
  customerDataApiUrl,
  getUserChatMessagesApiUrl,
  getUserChatConversationIdsApiUrl,
  sendUserChatMessageApiUrl,
};
