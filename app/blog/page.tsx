import { isMobileDevice } from "@/app/generalFunctions/isMobile";
import { fetchBlogPagePosts } from "@/app/generalFunctions/apiDataFetches/blogRoute/fetchBlogPagePosts";
import Header from "@/app/ui/headerAndFooter/header/header";
import HeaderSection from "@/app/ui/blog/sections/headerSection";
import BlogPosts from "@/app/ui/blog/sections/blogPosts";
import FooterSeperatorSection from "@/app/ui/sharedComponents/footerSeperatorSection";
import Footer from "@/app/ui/headerAndFooter/footer/footer";
import "@/app/ui/styles/scss/route-pages/blog/blog-page.scss";

export default async function Page() {
  const isMobile = await isMobileDevice();
  const blogPagePosts = await fetchBlogPagePosts();

  return (
    <main id="kst-rc-blog">
      <Header isMobile={isMobile} style="light-theme" />
      <HeaderSection {...blogPagePosts.featured} />
      <BlogPosts posts={blogPagePosts.latest} />
      <FooterSeperatorSection isMobile={isMobile} style="light-theme" />
      <Footer style="light-theme" />
    </main>
  );
}
