import { createPost, getPostList } from "@/utils/postService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const posts = await getPostList();
      console.log('posts -> api/post', posts)
      return res.status(200).json(posts);
    }

    if (req.method === "POST") {
      const newPost = await createPost(req.body);
      return res.status(201).json(newPost);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
