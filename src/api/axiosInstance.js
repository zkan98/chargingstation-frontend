// src/api/axiosInstance.js
import axios from 'axios';

// 쿠키에서 특정 쿠키 값을 가져오는 함수
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 환경 변수 확인
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송 필요 시 설정
});

// 요청 인터셉터: 액세스 토큰을 헤더에 추가
axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 시 리프레시 토큰으로 토큰 갱신 시도
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 401 에러이고, 재시도하지 않은 경우
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getCookie('refreshToken');

          if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다.');
          }

          // 리프레시 토큰으로 새로운 액세스 토큰 요청
          const response = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/users/token/refresh`,
              {},
              {
                headers: {
                  'Authorization': `Bearer ${refreshToken}`,
                },
                withCredentials: true, // 쿠키 전송
              }
          );

          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // 원래 요청에 새로운 액세스 토큰 헤더 추가
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('토큰 갱신 실패:', err);
          // 토큰 갱신 실패 시 사용자 로그아웃 처리
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
);

export default axiosInstance;
