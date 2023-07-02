import PostPreview from "@/components/post-preview";
import type Post from "@/interfaces/post";

type Props = {
  posts: Post[];
};

const MorePosts = ({ posts }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">More Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview key={post.id} view="gallery" post={post} />
        ))}
      </div>
    </section>
  );
};

export default MorePosts;
