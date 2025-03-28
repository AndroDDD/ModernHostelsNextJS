import type { MetadataRoute } from "next";

import { useHttpProtocol } from "./generalFunctions/devToPro/useHttpProtocol";
import { useNextJSPort } from "./generalFunctions/devToPro/useDevOrigin";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = `${useHttpProtocol}${useNextJSPort}`;

  return [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseURL}map`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseURL}blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
