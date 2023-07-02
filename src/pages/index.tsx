import Layout from "@/components/layout";
import MorePosts from "@/components/more-posts";
import PostPreview from "@/components/post-preview";
import Post from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";

type Props = {
  heroPost: Post;
  morePosts: Post[];
};

export default function Index({ heroPost, morePosts }: Props) {
  return (
    <Layout view="home">
      {heroPost && <PostPreview view="hero" post={heroPost} />}
      {morePosts.length > 0 && <MorePosts posts={morePosts} />}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return {
    props: { heroPost, morePosts },
  };
};
