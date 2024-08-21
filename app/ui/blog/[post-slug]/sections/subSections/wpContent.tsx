import "@/app/ui/styles/scss/components/blog/[post-slug]/sections/sub-sections/wp-content.scss";

export default ({ content }: { content: string }) => {
  return (
    <div
      className="kst-blog-post-wp-content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
