import { stripHtml } from "string-strip-html";

import { blogPostsUrl } from "@/app/constants/wpApiUrl";
import { calculateReadTimeFromWPContent } from "@/app/generalFunctions/calculateReadTimeFromWPContent";

const he = require("he");

export const fetchPostPageData = async (slug: string) => {
  const response = await fetch(`${blogPostsUrl}?_embed&slug=${slug}`);
  const data = (await response.json())[0];

  const preparedData = {
    id: data.id,
    title: he.decode(data.title.rendered),
    excerpt: stripHtml(he.decode(data.excerpt.rendered)).result,
    featuredImage: data._embedded["wp:featuredmedia"][0].source_url,
    content: he.decode(data.content.rendered),
    author: data._embedded["author"][0].name,
    date: new Date(data.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: calculateReadTimeFromWPContent(data.content.rendered),
  };
  console.log({ data });

  return preparedData;
};
