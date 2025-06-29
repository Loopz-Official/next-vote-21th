import { authRequest, request } from '@/services/utils/instance';
import { ApiResponse } from '@/services/utils/types';
import { SignupInfo } from '@/stores/useSignupInfo';
import { SignupResponse } from './types';

export const signup = async (signupInfo: SignupInfo) => {
	try {
		const response = await authRequest.post<ApiResponse<SignupResponse>>(
			'/user/v1/join',
			signupInfo
		);

		console.log('Signup response:', response);

		if (response.status === 200 || response.status === 201) {
			return response.status;
		}
	} catch (error) {
		console.error('Signup error:', error);
	}
};

export const login = async (email: string, password: string) => {
	try {
		const response = await authRequest.post('/user/v1/login', {
			email,
			password,
		});

		console.log('Login response:', response);

		if (response.status === 200) {
			const authorization = response.headers?.authorization;
			if (!authorization) return;

			const accessToken = authorization.split(' ')[1];

			return {
				status: response.status,
				token: accessToken,
			};
		}
	} catch (error) {
		console.error('Login error:', error);
	}
};

export const logout = async () => {
	try {
		const response = await authRequest.post('/user/v1/logout');
		console.log('Logout response:', response);

		if (response.status === 200) {
			return response.status;
		}
	} catch (error) {
		console.error('Logout error:', error);
	}
};
