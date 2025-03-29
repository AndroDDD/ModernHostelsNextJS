import type { MetadataRoute } from "next";

import { blogPostsUrl } from "@/app/constants/wpApiUrl";
import { wpAuthorizationHeaderValue } from "@/app/constants/wpFetchHeaders";
import { fetchOriginHeader } from "../generalFunctions/devToPro/useDevOrigin";
import { useHttpProtocol } from "../generalFunctions/devToPro/useHttpProtocol";
import { useNextJSPort } from "../generalFunctions/devToPro/useDevOrigin";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const postsFetchResponse = await fetch(`${blogPostsUrl}?_embed`, {
    method: "GET",
    headers: {
      Origin: fetchOriginHeader,
      Authorization: wpAuthorizationHeaderValue,
    },
  });

  const posts = await postsFetchResponse.json();

  const sitemapURLs = posts.map(
    ({ slug, modified }: { slug: string; modified: string }) => ({
      url: `${useHttpProtocol}${useNextJSPort}blog/${slug}`,
      lastModified: modified,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...sitemapURLs];
}
