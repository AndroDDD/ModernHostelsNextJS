import WPContent from "@/app/ui/blog/[post-slug]/sections/subSections/wpContent";
import Sidebar from "@/app/ui/blog/[post-slug]/sections/subSections/sidebar";

import "@/app/ui/styles/scss/components/blog/[post-slug]/sections/main-section.scss";

type MainSection = {
  content: string;
};

export default ({ data: { content } }: { data: MainSection }) => {
  return (
    <section id="kst-blog-post-main-section">
      <div className="kst-blog-post-main-section-sidebar">
        <Sidebar
          header="The comfort of a second home. The convenience of a hotel. <strong>The reliability of Modern Hostels.</strong>"
          link1={{ href: "/map", header: "Browse Rental Properties" }}
          link2={{
            href: "/list-property",
            header: "List with Mordern Hostels",
          }}
        />
      </div>

      <div className="kst-blog-post-main-section-content">
        <WPContent content={content} />
      </div>
    </section>
  );
};
