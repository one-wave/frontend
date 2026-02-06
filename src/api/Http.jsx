import axios from "axios";

/** JWT accessToken payload에서 sub(userId) 추출 */
export function getUserIdFromToken(accessToken) {
  if (!accessToken || typeof accessToken !== "string") return null;
  try {
    const parts = accessToken.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://barrierfree-applicant-server-production.up.railway.app/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS 허용 (기존 설정 유지)
});

// 1. 요청 인터셉터 (Request Interceptor)
// : API 요청을 보낼 때마다 헤더에 'accessToken'을 자동으로 집어넣습니다.
api.interceptors.request.use(
  (config) => {
    // [수정] 'token' 대신 'accessToken'을 사용합니다.
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. 응답 인터셉터 (Response Interceptor)
// : 401 에러(토큰 만료)가 뜨면 자동으로 리프레시 토큰으로 재발급을 시도합니다.
api.interceptors.response.use(
  (response) => {
    return response; // 성공하면 그대로 통과
  },
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // 조건: 401 에러이고, 아직 재시도를 안 했으며, 리프레시 요청 자체가 아닐 때
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/refresh"
    ) {
      originalRequest._retry = true; // 무한 재시도 방지 플래그

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken) {
            throw new Error("리프레시 토큰이 없습니다."); 
        }

        // [API 호출] 토큰 재발급 요청
        // 주의: api.post 대신 axios.post를 씁니다 (인터셉터 무한 루프 방지)
        const { data } = await axios.post(
          `${BASE_URL.replace(/\/api\/?$/, "")}/api/auth/refresh`,
          { refreshToken: refreshToken } 
        );

        // [중요] 새로 받은 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        const userId = getUserIdFromToken(newAccessToken);
        if (userId) localStorage.setItem("userId", userId);

        // 실패했던 요청의 헤더를 새 토큰으로 교체하고 다시 시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        // 재발급 실패 시 로그아웃 처리
        console.error("토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        
        // 로그인 페이지로 이동 (window.location 사용)
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);