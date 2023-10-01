import React from "react";
import PostContent from "@/components/posts/post-details/PostContent";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from "@/types/post";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import Head from "next/head";

const PostDetailsPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export default PostDetailsPage;

export const getStaticPaths: GetStaticPaths = () => {
  // get all posts
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    // 404 for non-existing paths
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<{
  post: Post;
}> = ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    // regenerate the page after 10 minutes
    revalidate: 600,
  };
};
