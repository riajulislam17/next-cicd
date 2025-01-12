import { GetServerSideProps } from "next";
import { getPost } from "@/utils/postService";
import PostForm from "@/components/PostManagement/PostForm";

interface PostPageProps {
  initialPost?: Post;
}

const PostPage = ({ initialPost }: PostPageProps) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">
        {initialPost ? "Edit Post" : "Create Post"}
      </h1>
      <PostForm initialPost={initialPost} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (id) {
    try {
      const post = await getPost(Number(id));
      return { props: { initialPost: post } };
    } catch (error) {
      return { notFound: true }; // Handle not found case
    }
  }

  return { props: {} }; // No initial data for creating a new post
};

export default PostPage;
