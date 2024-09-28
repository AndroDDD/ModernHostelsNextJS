import Link from "next/link";

import WPContent from "@/app/ui/blog/[post-slug]/sections/subSections/wpContent";
import Sidebar from "@/app/ui/blog/[post-slug]/sections/subSections/sidebar";

import "@/app/ui/styles/scss/components/blog/[post-slug]/sections/main-section.scss";

type MainSection = {
  content: string;
  adjacentPostsSlugs: {
    previous?: string;
    next?: string;
  };
};

export default ({
  data: { content, adjacentPostsSlugs },
}: {
  data: MainSection;
}) => {
  return (
    <section id="kst-blog-post-main-section">
      <div className="kst-blog-post-main-section-sidebar">
        <Sidebar
          header="The comfort of a second home. The convenience of a hotel. <strong>The reliability of Modern Hostels.</strong>"
          link1={{ href: "/map", header: "Browse Rental Properties" }}
          link2={{
            href: "/list-property",
            header: "List with Modern Hostels",
          }}
        />
      </div>

      <div className="kst-blog-post-main-section-content">
        <WPContent content={content} />
      </div>

      <div className="kst-blog-post-main-section-pagination">
        {adjacentPostsSlugs["next"] ? (
          <Link
            className="kst-blog-post-main-section-pagination-link next"
            href={`/blog/${adjacentPostsSlugs["next"]}`}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Link>
        ) : (
          <></>
        )}

        {adjacentPostsSlugs["previous"] ? (
          <Link
            className="kst-blog-post-main-section-pagination-link prev"
            href={`/blog/${adjacentPostsSlugs["previous"]}`}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};
