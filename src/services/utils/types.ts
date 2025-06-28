// API 응답 기본 타입
export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}
