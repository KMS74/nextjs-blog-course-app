import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import AllPosts from "@/components/posts/AllPosts";
import { getAllPosts } from "@/lib/posts-util";
import { Post } from "@/types/post";

const AllPostsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AllPosts posts={posts} />;
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
