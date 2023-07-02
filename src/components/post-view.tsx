import Cover from "@/components/cover";
import DateFormatter from "@/components/date-formatter";
import postViewStyles from "@/components/post-view.module.css";
import type Post from "@/interfaces/post";

type Props = { post: Post };

const PostView = ({ post }: Props) => {
  return (
    <article className="mb-32">
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {post.title}
      </h2>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <Cover src={post.cover} title={post.title} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={post.date} />
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className={postViewStyles.markdown} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default PostView;
