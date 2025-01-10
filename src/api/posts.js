import axiosInstance from ".";

export function getPosts(data) {
  return axiosInstance.post(`/api/board/v1/posts/list`, data);
}
