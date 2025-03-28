import type { MetadataRoute } from "next";

import { wpApiUrl } from "@/app/constants/wpApiUrl";
import { wpAuthorizationHeaderValue } from "@/app/constants/wpFetchHeaders";
import { fetchOriginHeader } from "../generalFunctions/devToPro/useDevOrigin";
import { useHttpProtocol } from "../generalFunctions/devToPro/useHttpProtocol";
import { useNextJSPort } from "../generalFunctions/devToPro/useDevOrigin";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const locationsFetchResponse = await fetch(`${wpApiUrl}kstpm_locations`, {
    headers: {
      Origin: fetchOriginHeader,
      Authorization: wpAuthorizationHeaderValue,
    },
  });
  const locations = await locationsFetchResponse.json();

  const sitemapURLs = locations.map(
    ({ slug, modified }: { slug: string; modified: string }) => ({
      url: `${useHttpProtocol}${useNextJSPort}location/${slug}`,
      lastModified: modified,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...sitemapURLs];
}
