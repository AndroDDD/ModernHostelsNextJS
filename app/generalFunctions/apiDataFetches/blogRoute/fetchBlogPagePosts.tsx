import { stripHtml } from "string-strip-html";

import { blogPostsUrl } from "@/app/constants/wpApiUrl";
import { calculateReadTimeFromWPContent } from "@/app/generalFunctions/calculateReadTimeFromWPContent";

const he = require("he");

export async function fetchBlogPagePosts() {
  const response = await fetch(`${blogPostsUrl}?_embed`);
  const data = await response.json();
  const featuredPost = data[0];
  const featuredPostReadTime = calculateReadTimeFromWPContent(
    data[0].content.rendered
  );

  const preparedData = {
    featured: {
      title: he.decode(featuredPost.title.rendered),
      content: featuredPost.content.rendered,
      excerpt: featuredPost.excerpt.rendered,
      featuredImage: featuredPost._embedded["wp:featuredmedia"]
        ? featuredPost._embedded["wp:featuredmedia"][0].source_url
        : "",
      date: new Date(featuredPost.date).toDateString(),
      author: featuredPost._embedded.author[0].name,
      readTime: featuredPostReadTime,
      postLink: `/blog/${featuredPost.slug}`,
    },
    latest: data.slice(1, 4).map(
      (post: {
        slug: string;
        title: { rendered: string };
        content: { rendered: string };
        excerpt: { rendered: string };
        date: string;
        _embedded: {
          author: { name: string }[];
          ["wp:featuredmedia"]: { source_url: string }[];
        };
      }) => ({
        title: he.decode(post.title.rendered),
        content: post.content.rendered,
        excerpt: stripHtml(post.excerpt.rendered).result.replace(
          "[&hellip;]",
          "..."
        ),
        featuredImage: post._embedded["wp:featuredmedia"]
          ? post._embedded["wp:featuredmedia"][0].source_url
          : "",
        date: new Date(post.date).toDateString(),
        author: post._embedded.author[0].name,
        postLink: `/blog/${post.slug}`,
        readTime: calculateReadTimeFromWPContent(post.content.rendered),
      })
    ),
    all: data,
  };
  return preparedData;
}
