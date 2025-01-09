import axios from "axios";

// Axios 기본 인스턴스 정의
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`, // 기본 baseURL
  timeout: 3000, // 기본 timeout
})

// Axios 커스텀 인스턴스 생성 함수 정의
export const createCustomAxiosInstance = (options = {}) => {
  return axios.create({
    baseURL: options.baseURL || axiosInstance.baseURL,
    timeout: options.timeout || axios.timeout,
    headers: { ...axiosInstance.defaults.headers, ...options.headers }
  });
}

export default axiosInstance
