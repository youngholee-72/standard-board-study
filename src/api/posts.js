import axiosInstance from ".";

// list: PostListView
export function getPosts(data) {
  console.log(`getPosts`)
  return axiosInstance.post(`/api/board/v1/posts/list`, data);
}

// create: PostCreateView
export function createPost(data) {
  console.log(`createPost`)
  return axiosInstance.post(`/api/board/v1/posts`, data);
}

// detail: PostDetailView
export function getPostById(id) {
  console.log(`getPostById`)
  return axiosInstance.get(`/api/board/v1/posts/${id}`);
}

// edit: PostEditView
export function updatePost(id, data) {
  console.log(`updatePost`)
  return axiosInstance.patch(`/api/board/v1/posts/${id}`, data);
}

// delete
export function deletePost(id) {
  console.log(`deletePost`)
  return axiosInstance.delete(`/api/board/v1/posts/${id}`);
}
