import { useState } from "react";
import { useRouter } from "next/router";
import { createPost, updatePost } from "@/utils/postService";

interface PostFormProps {
  initialPost?: Post;
}

const PostForm = ({ initialPost }: PostFormProps) => {
  const [post, setPost] = useState<Post>(
    initialPost || { title: "", body: "" }
  );
  const router = useRouter();
  const isEditMode = !!initialPost;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updatePost(post.id as number, post);
        alert("Post updated successfully!");
      } else {
        await createPost(post);
        alert("Post created successfully!");
      }
      router.push("/post");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="p-8">
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Body</label>
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            rows={5}
            required
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-2 rounded font-semibold"
            onClick={handleSubmit}
          >
            {isEditMode ? "Update Post" : "Create Post"}
          </button>

          <button
            type="submit"
            className="border border-red-500 text-red-500 px-6 py-2 rounded font-semibold"
            onClick={() => router.push("/post")}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PostForm;
