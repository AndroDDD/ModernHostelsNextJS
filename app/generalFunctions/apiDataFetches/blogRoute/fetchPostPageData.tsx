"use server";

import { stripHtml } from "string-strip-html";

import {
  blogPostsUrl,
  blogPostAdjacentPostsUrl,
} from "@/app/constants/wpApiUrl";
import { calculateReadTimeFromWPContent } from "@/app/generalFunctions/calculateReadTimeFromWPContent";

const he = require("he");

export const fetchPostPageData = async (slug: string) => {
  try {
    const response = await fetch(`${blogPostsUrl}?_embed&slug=${slug}`);
    const responseHeader = response.headers;
    const data = (await response.json())[0];
    const postId = data.id;

    let adjacentPostsSlugsJson = {};

    try {
      const adjacentPostsSlugsResponse = await fetch(
        `${blogPostAdjacentPostsUrl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: postId,
          }),
        }
      );
      adjacentPostsSlugsJson = await adjacentPostsSlugsResponse.json();

      console.log({ adjacentPostsSlugsJson });
    } catch (err) {
      console.log({ error: "Failed to fetch adjacent posts slugs" });
    }

    const preparedData = {
      id: postId,
      title: he.decode(data.title.rendered),
      excerpt: stripHtml(he.decode(data.excerpt.rendered)).result,
      featuredImage:
        data._embedded && data._embedded["wp:featuredmedia"]
          ? data._embedded["wp:featuredmedia"][0].source_url
          : "",
      content: he.decode(data.content.rendered),
      author: data._embedded["author"][0].name,
      date: new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: calculateReadTimeFromWPContent(data.content.rendered),
      adjacentPostSlugs: adjacentPostsSlugsJson,
    };

    return preparedData;
  } catch (err: any) {
    console.log({ error: err.message });

    return { error: err };
  }
};
