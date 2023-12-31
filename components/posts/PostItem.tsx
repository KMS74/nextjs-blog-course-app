import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./post-item.module.css";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

const PostItem: React.FC<Props> = ({ post }) => {
  const { title, image, date, excerpt, slug } = post;
  // format the date to a human readable date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long", // 1 => 'January'
    year: "numeric",
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
