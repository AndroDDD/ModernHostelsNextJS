import Link from "next/link";

import "@/app/ui/styles/scss/components/blog/[post-slug]/sections/sub-sections/sidebar.scss";

type Sidebar = {
  header: string;
  link1: { href: string; header: string };
  link2: { href: string; header: string };
};

export default ({ header, link1, link2 }: Sidebar) => {
  return (
    <section id="kst-blog-post-sidebar">
      <div className={"kst-blog-post-other-properties"}>
        <div
          className={"kst-other-properties-header"}
          dangerouslySetInnerHTML={{ __html: header }}
        ></div>
        <Link href={link1.href} className={"kst-other-properties-link"}>
          {link1.header}
        </Link>
        {/* <Link href={link2.href} className={"kst-other-properties-link"}>
          {link2.header}
        </Link> */}
      </div>
    </section>
  );
};
