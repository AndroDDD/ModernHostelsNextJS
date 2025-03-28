import type { MetadataRoute } from "next";

import { useHttpProtocol } from "./generalFunctions/devToPro/useHttpProtocol";
import { useNextJSPort } from "./generalFunctions/devToPro/useDevOrigin";

export default function robots(): MetadataRoute.Robots {
  const baseSiteMapURL = `${useHttpProtocol}${useNextJSPort}sitemap.xml`;
  const propertySitemapURL = `${useHttpProtocol}${useNextJSPort}property/sitemap.xml`;
  const locationsSitemapURL = `${useHttpProtocol}${useNextJSPort}locations/sitemap.xml`;
  const listPropertySitemapURL = `${useHttpProtocol}${useNextJSPort}list-property/sitemap.xml`;
  const blogSitemapURL = `${useHttpProtocol}${useNextJSPort}blog/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/checkout/order-review",
        "/checkout/secured-payment",
        "/checkout/thank-you",
        "/dashboard",
      ],
    },
    sitemap: [
      baseSiteMapURL,
      propertySitemapURL,
      locationsSitemapURL,
      listPropertySitemapURL,
      blogSitemapURL,
    ],
  };
}
