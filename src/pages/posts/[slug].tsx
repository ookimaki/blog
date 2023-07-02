import Layout from "@/components/layout";
import MorePosts from "@/components/more-posts";
import PostView from "@/components/post-view";
import type PostType from "@/interfaces/post";
import { getAllPosts, getPostContent } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdownToHtml";

type Props = {
  post: PostType;
  morePosts: PostType[];
};

export default function Post({ post, morePosts }: Props) {
  return (
    <Layout view="post">
      {post && <PostView post={post} />}
      {morePosts.length > 0 && <MorePosts posts={morePosts} />}
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === params.slug);
  const morePosts = posts.filter((post) => post.slug !== params.slug);
  const contentMarkdown = await getPostContent(post.id);
  const content = await markdownToHtml(contentMarkdown);
  return {
    props: {
      post: {
        ...post,
        content,
      },
      morePosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}
