import { GetServerSideProps } from "next";
import { getPost } from "@/utils/postService";
import PostForm from "@/components/PostManagement/PostForm";

interface PostPageProps {
  initialPost?: Post;
}

const PostPage = ({ initialPost }: PostPageProps) => {
  return (
    <>
      <PostForm initialPost={initialPost} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
// export const getStaticProps: GetStaticProps = async (context) => {
  // const router = useRouter();
  const { id } = context.query;

  if (id) {
    try {
      const post = await getPost(Number(id));
      return { props: { initialPost: post } };
    } catch (error) {
      console.log("error", error);
      return { notFound: true };
    }
  }

  return { props: {} };
};

export default PostPage;
