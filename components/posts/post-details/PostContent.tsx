import React from "react";
import PostHeader from "./PostHeader";
import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";
import { Post } from "@/types/post";
import Image from "next/image";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";

SyntaxHighlighter.registerLanguage("javascript", js);

type Props = {
  post: Post;
};

const PostContent: React.FC<Props> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown
        components={{
          img({ node, ...props }) {
            return (
              <Image
                alt={props.alt as string}
                src={`/images/posts/${post.slug}/${props.src}`}
                width={600}
                height={300}
              />
            );
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
                style={atomOneDark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post.content as string}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
