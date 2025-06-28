import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T>(config: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

// 새로운 서버 axios 인스턴스
export const request: CustomInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 20000,
  headers: {
    accept: "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    // 헤더에 토큰 추가
    // const jwt = window.localStorage.getItem("accessToken");
    // config.headers.Authorization = `Bearer ${jwt}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    // 2XX 범위
    // response body 반환
    console.log("network log", response);
    return response.data;
  },
  (error) => {
    // 그 외
    // error로 AxiosError 타입 반환

    // 인증 에러 시 로그인 화면으로 이동
    // if (error.status === 401 || error.status === 403) {
    //   window.localStorage.removeItem("accessToken");
    //   window.location.href = "/login";
    // }

    console.group(
      `🚨 API Error: ${error.config?.method?.toUpperCase()} ${
        error.config?.url
      }`
    );
    console.error("전체 에러 객체:", error);
    console.error("에러 응답 데이터:", error.response?.data);
    console.groupEnd();

    return Promise.reject(error.response?.data || error);
  }
);
