import React from "react";
import classes from "./all-posts.module.css";
import PostsGrid from "./PostsGrid";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

const AllPosts: React.FC<Props> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
