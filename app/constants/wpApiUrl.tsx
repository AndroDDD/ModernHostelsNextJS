import { fullWPURL } from "@/app/generalFunctions/devToPro/replaceWithXAMPPUrl";

const wpApiUrl = `${fullWPURL}wp-json/wp/v2/`;
const wpPropertyPriceDataApiUrl = `${fullWPURL}wp-json/kst/v1/price-data/`;
const wpLocationsApiUrl = `${fullWPURL}wp-json/kst/v1/locations/`;
const wpPropertyCalendarApiUrl = `${fullWPURL}wp-json/kst/v1/calendar/`;
const propertyUpdateRatingsApiUrl = `${fullWPURL}wp-json/kst/v1/property/update-property-rating/`;
const blogPostsUrl = `${fullWPURL}wp-json/wp/v2/ai_blog_posts/`;
const blogPostAdjacentPostsUrl = `${fullWPURL}wp-json/kst/post/get-adjacent-slugs`;
const emailServerUrl = `${fullWPURL}wp-json/kst/sendContactForm/`;
const getLogoUrl = `${fullWPURL}wp-json/kst/get-logo-url/`;
const newsletterApiUrl = `${fullWPURL}wp-json/kst/v1/newsletter/`;
const homepageSettingsApiUrl = `${fullWPURL}wp-json/kst/homepage-settings`;
const socialCommunicationsUrl = `${fullWPURL}wp-json/kst/social-communications/`;
const checkoutSubmitOrderApiUrl = `${fullWPURL}wp-json/kstecm/v1/orders/submit`;
const createCustomerApiUrl = `${fullWPURL}wp-json/kstecm/v1/customer/create`;
const updateCustomerApiUrl = `${fullWPURL}wp-json/kstecm/v1/customer/update`;
const customerOrdersApiUrl = `${fullWPURL}wp-json/kstecm/v1/orders`;
const customerRewardsTierApiUrl = `${fullWPURL}wp-json/kstecm/v1/rewards/rental/tiers/all`;
const customerRewardsApiUrl = `${fullWPURL}wp-json/kstecm/v1/rewards/rental/customer`;
const customersDataApiUrl = `${fullWPURL}wp-json/kstecm/v1/customers`;
const customerDataApiUrl = `${fullWPURL}wp-json/kstecm/v1/customer`;
const getUserChatMessagesApiUrl = `${fullWPURL}wp-json/kstecm/v1/chat/get-messages`;
const getUserChatConversationIdsApiUrl = `${fullWPURL}wp-json/kstecm/v1/chat/get-conversation-ids`;
const sendUserChatMessageApiUrl = `${fullWPURL}wp-json/kstecm/v1/chat/send-message`;
const updateCustomerOrderReviewApiUrl = `${fullWPURL}wp-json/kst/v1/property/update-reviews/`;

export {
  wpApiUrl,
  wpPropertyPriceDataApiUrl,
  wpLocationsApiUrl,
  wpPropertyCalendarApiUrl,
  propertyUpdateRatingsApiUrl,
  blogPostsUrl,
  blogPostAdjacentPostsUrl,
  emailServerUrl,
  getLogoUrl,
  newsletterApiUrl,
  homepageSettingsApiUrl,
  socialCommunicationsUrl,
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
  updateCustomerOrderReviewApiUrl,
};
