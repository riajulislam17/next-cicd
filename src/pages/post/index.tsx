import PostList from "@/components/PostManagement/PostList";
import { getPostList } from "@/utils/postService";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export default function index({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PostList posts={posts} />
    </>
  );
}

export const getServerSideProps = (async () => {
  const res = await getPostList();
  const posts: Post[] = await res;
  return { props: { posts } };
}) satisfies GetServerSideProps<{ posts: Post[] }>;
