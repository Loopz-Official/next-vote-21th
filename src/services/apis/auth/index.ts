import { request } from '@/services/utils/instance';
import { ApiResponse } from '@/services/utils/types';
import { SignupInfo } from '@/stores/useSignupInfo';
import { SignupResponse } from './types';

export const signup = async (signupInfo: SignupInfo) => {
	try {
		const response = await request.post<ApiResponse<SignupResponse>>(
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
