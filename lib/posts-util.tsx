import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getAllPosts(): Post[] {
  const postsFiles = getPostsFiles();
  const allPosts = postsFiles.map((postFile) => {
    return getPostData(postFile);
  });

  return allPosts.sort((a, b) => (+a.date > +b.date ? -1 : 1));
}

export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // will remove the .md extension
  const postPath = path.join(postsDirectory, `${postSlug}.md`); // will create the path to the post
  const fileContent = fs.readFileSync(postPath, "utf-8"); // will read the file content
  const { data, content } = matter(fileContent); // will parse the file content to get the data and the content
  const postMeatData: Post = {
    title: "",
    date: "",
    image: "",
    excerpt: "",
    slug: "",
    isFeatured: false,
    ...data,
  };
  return {
    ...postMeatData, // meta data of the post (title, date, image, excerpt, isFeatured)
    content, // the content of the post (markdown)
    slug: postSlug, // the slug of the post (filename without the .md extension)
  };
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
