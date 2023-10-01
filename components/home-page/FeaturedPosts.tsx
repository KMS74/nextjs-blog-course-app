import React from "react";
import classes from "./featured-posts.module.css";
import PostsGrid from "../posts/PostsGrid";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

const FeaturedPosts: React.FC<Props> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
