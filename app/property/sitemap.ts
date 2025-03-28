import type { MetadataRoute } from "next";

import { wpApiUrl } from "@/app/constants/wpApiUrl";
import { wpAuthorizationHeaderValue } from "@/app/constants/wpFetchHeaders";
import { fetchOriginHeader } from "../generalFunctions/devToPro/useDevOrigin";
import { useHttpProtocol } from "../generalFunctions/devToPro/useHttpProtocol";
import { useNextJSPort } from "../generalFunctions/devToPro/useDevOrigin";

// export async function generateSitemaps() {
//   const listingsFetchResponse = await fetch(`${wpApiUrl}kstpm_properties`, {
//     headers: {
//       Origin: fetchOriginHeader,
//       Authorization: wpAuthorizationHeaderValue,
//     },
//   });
//   const listings = await listingsFetchResponse.json();
//   const sitemapsIDs = [
//     {
//       id: 0,
//     },
//   ];

//   return sitemapsIDs;
// }

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google limit is 50,000 URLs per sitemap
  const listingsFetchResponse = await fetch(`${wpApiUrl}kstpm_properties`, {
    headers: {
      Origin: fetchOriginHeader,
      Authorization: wpAuthorizationHeaderValue,
    },
  });
  const listings = await listingsFetchResponse.json();

  const sitemapURLs = listings.map(
    ({ slug, modified }: { slug: string; modified: string }) => ({
      url: `${useHttpProtocol}${useNextJSPort}property/${slug}`,
      lastModified: modified,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...sitemapURLs];
}
