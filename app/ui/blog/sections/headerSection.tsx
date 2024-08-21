"use client";
import { useEffect } from "react";
import Link from "next/link";

import "@/app/ui/styles/scss/components/blog/sections/header-section.scss";

type HeaderSection = {
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  author: string;
  readTime: number;
  postLink: string;
};

export default ({
  title,
  content,
  excerpt,
  featuredImage,
  date,
  author,
  readTime,
  postLink,
}: HeaderSection) => {
  useEffect(() => {
    console.log({
      title,
      content,
      excerpt,
      featuredImage,
      date,
      author,
      readTime,
      postLink,
    });
  });

  return (
    <section
      id="kst-blog-header-section"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 244, 241, 0.33) 0%, rgba(248, 244, 241, 0.9) 52.79%, rgb(248, 244, 241) 87.17%), url("https://centraltexasmom.com/wp-content/uploads/2015/12/Austin-Texas-Background2.jpg")`,
      }}
    >
      <div className="kst-blog-header-section-title">{"Featured"}</div>

      <div className="kst-blog-header-section-subtext">{title}</div>

      <div className="kst-blog-header-section-meta">
        <div className="kst-blog-header-section-meta-date">{date}</div>

        <div className="kst-blog-header-section-meta-read-time">
          {`${readTime} min read`}
        </div>
      </div>

      <Link className="kst-blog-header-section-button" href={postLink}>
        {"Read More"}
      </Link>
    </section>
  );
};
