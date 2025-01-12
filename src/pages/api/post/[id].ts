import { deletePost, getPost, updatePost } from "@/utils/postService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    if (req.method === "GET") {
      const post = await getPost(Number(id));
      return res.status(200).json(post);
    }

    if (req.method === "PATCH") {
      const updatedPost = await updatePost(Number(id), req.body);
      return res.status(200).json(updatedPost);
    }

    if (req.method === "DELETE") {
      await deletePost(Number(id));
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
