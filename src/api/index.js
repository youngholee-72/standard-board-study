import axios from "axios";

// Axios 기본 인스턴스 정의
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`, // 기본 baseURL
  timeout: 3000, // 기본 timeout
})

export const setAuthorizationHeader = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
}

// 헤더 제거 (예: 로그아웃 시)
export const clearAuthorizationHeader = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
}

// Axios 커스텀 인스턴스 생성 함수 정의
export const createCustomAxiosInstance = (options = {}) => {
  return axios.create({
    baseURL: options.baseURL || axiosInstance.baseURL,
    timeout: options.timeout || axios.timeout,
    headers: { ...axiosInstance.defaults.headers, ...options.headers }
  });
}

// 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 응답 성공 시 그대로 반환
  (error) => {
    console.log('인터셉터')
    if (error.response && error.response.status === 401) {
      // 토큰 만료 시 처리
      window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

export default axiosInstance
