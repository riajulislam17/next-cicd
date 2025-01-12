import apiRequester from "./APIRequester";

export const getPostList = async (): Promise<Post[]> => {
  const response = await apiRequester.get<Post[]>("posts");
  return response.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await apiRequester.get<Post>(`posts/${id}`);
  return response.data;
};

export const createPost = async (newPost: Post): Promise<Post> => {
  const response = await apiRequester.post<Post>("posts", newPost);
  return response.data;
};

export const updatePost = async (
  id: number,
  updatedPost: Post
): Promise<Post> => {
  const response = await apiRequester.patch<Post>(`posts/${id}`, updatedPost);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await apiRequester.delete(`posts/${id}`);
};
