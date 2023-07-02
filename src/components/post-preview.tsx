import Link from "next/link";

import Cover from "@/components/cover";
import DateFormatter from "@/components/date-formatter";
import type Post from "@/interfaces/post";
import type View from "@/interfaces/post-view";

type Props = { view: View; post: Post };

const PostPreview = ({ view, post }: Props) => {
  return (
    <>
      {view === "hero" && (
        <section>
          <Link href={`/posts/${post.slug}`}>
            <div className="mb-8 md:mb-16">
              <Cover src={post.cover} title={post.title} />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
              <div>
                <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">{post.title}</h3>
                <div className="mb-4 md:mb-0 text-lg">
                  <DateFormatter dateString={post.date} />
                </div>
              </div>
              <div>
                <p className="text-lg leading-relaxed mb-4">{post.summary}</p>
              </div>
            </div>
          </Link>
        </section>
      )}
      {view === "gallery" && (
        <div>
          <Link href={`/posts/${post.slug}`}>
            <div className="mb-5">
              <Cover src={post.cover} title={post.title} />
            </div>
            <h3 className="text-3xl mb-3 leading-snug">{post.title}</h3>
            <div className="text-lg mb-4">
              <DateFormatter dateString={post.date} />
            </div>
            <p className="text-lg leading-relaxed mb-4">{post.summary}</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default PostPreview;
