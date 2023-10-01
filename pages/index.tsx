import React from "react";
import HeroSection from "../components/home-page/HeroSection";
import FeaturedPosts from "@/components/home-page/FeaturedPosts";
import { Post } from "@/types/post";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getFeaturedPosts } from "@/lib/posts-util";
import Head from "next/head";

const HomePage = ({
  featuredPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>NextJS Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <HeroSection />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<{
  featuredPosts: Post[];
}> = () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      featuredPosts,
    },
  };
};
