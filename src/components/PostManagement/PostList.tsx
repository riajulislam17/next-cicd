import { useRouter } from "next/router";
import { useState } from "react";

const PostList = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();
  const perPage = 10;
  const totalPages = Math.ceil(posts.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentPosts = posts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <h1 className="font-semibold text-xl">Post List</h1>
          <button
            className="bg-cyan-600 text-white px-8 py-2 rounded font-semibold"
            onClick={() => router.push("/post/post-form")}
          >
            Add Post
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Body</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border-b border-gray-300 px-4 py-2">
                  {post.id}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {post.title}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {post.body}
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <button
                    className="border border-cyan-600 text-cyan-600 px-4 py-1 rounded"
                    onClick={() => router.push(`/post/post-form?id=${post.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-cyan-600 text-white"
            }`}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-cyan-600 text-white"
                  : "bg-white border border-cyan-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-cyan-600 text-white"
            }`}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PostList;
