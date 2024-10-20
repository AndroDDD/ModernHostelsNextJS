import Image from "next/image";

import "@/app/ui/styles/scss/components/blog/[post-slug]/sections/header-section.scss";

type HeaderSection = {
  date: string;
  title: string;
  readingTime: number;
  author: string;
  excerpt: string;
  img: string;
};

export default ({
  data: { date, title, readingTime, author, excerpt, img },
}: {
  data: HeaderSection;
}) => {
  return (
    <section id="kst-blog-post-header-section">
      <div className="kst-blog-post-date">{date}</div>
      <div className="kst-blog-post-title">{title}</div>
      <div className="kst-blog-post-reading-time-and-author">
        <div className="kst-blog-post-reading-time">{readingTime} min read</div>
        <div className="kst-blog-post-author">By {author}</div>
      </div>
      <div className="kst-blog-post-excerpt">{excerpt}</div>
      <div className="kst-blog-post-img">
        <Image src={img} alt={title} width={1250} height={1250} />
      </div>
    </section>
  );
};
