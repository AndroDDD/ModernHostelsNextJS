import Link from "next/link";
import "@/app/ui/styles/scss/components/blog/sections/blog-posts.scss";

type BlogPosts = {
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  author: string;
  readTime: number;
  postLink: string;
}[];

export default ({ posts }: { posts: BlogPosts }) => {
  return (
    <section className="kst-blog-posts-display">
      <div className="kst-blog-posts-display-title">Most Recent</div>

      <div className="kst-blog-posts-display-items">
        {posts ? (
          posts.map((post) => (
            <Link href={post.postLink} className="kst-blog-posts-display-item">
              <div className="kst-blog-posts-display-item-image">
                <img src={post.featuredImage} alt="Blog Post 1" />
              </div>
              <div className="kst-blog-posts-display-item-text">
                <div className="kst-blog-posts-display-item-text-1">
                  {post.title}
                </div>

                <div className="kst-blog-posts-display-item-text-2">
                  {post.excerpt}
                </div>
              </div>
              <div className="kst-blog-posts-display-item-date">
                {post.date}
              </div>
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};
