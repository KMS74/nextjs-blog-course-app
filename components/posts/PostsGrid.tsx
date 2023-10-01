import React from "react";
import PostItem from "./PostItem";
import classes from "./posts-grid.module.css";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

const PostsGrid: React.FC<Props> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
