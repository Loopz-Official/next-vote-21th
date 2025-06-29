import axios, {
	AxiosInstance,
	AxiosInterceptorManager,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

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

export const authRequest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	timeout: 20000,
	headers: {
		accept: 'application/json',
	},
});

// 새로운 서버 axios 인스턴스
export const request = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	timeout: 20000,
	headers: {
		accept: 'application/json',
	},
});

request.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('access-token');

		// 토큰이 존재하면 토큰을 Authorization 헤더에 추가
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

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
		console.log('network log', response);
		return response.data;
	},
	(error) => {
		// 그 외
		// error로 AxiosError 타입 반환

		if (error.status === 401 || error.status === 403) {
			localStorage.removeItem('access-token');
			window.location.href = '/auth/login';
		}

		console.group(
			`🚨 API Error: ${error.config?.method?.toUpperCase()} ${
				error.config?.url
			}`
		);
		console.error('전체 에러 객체:', error);
		console.error('에러 응답 데이터:', error.response?.data);
		console.groupEnd();

		return Promise.reject(error.response?.data || error);
	}
);
