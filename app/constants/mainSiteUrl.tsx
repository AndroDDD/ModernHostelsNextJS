import { useNextJSPort } from "../generalFunctions/devToPro/useDevOrigin";
import { useHttpProtocol } from "../generalFunctions/devToPro/useHttpProtocol";

const homepageUrl = `${useHttpProtocol}${useNextJSPort}`;
const dashboardUrl = `${useHttpProtocol}${useNextJSPort}dashboard`;

export { homepageUrl, dashboardUrl };
