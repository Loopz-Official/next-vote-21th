import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SignupInfo {
	realName: string;
	email: string;
	password: string;
	part: string;
	team: string;
}

type SignupInfoStore = {
	signupInfo: SignupInfo;
	setSignupInfo: (info: Partial<SignupInfo>) => void;
};

export const useSignupInfo = create<SignupInfoStore>((set) => ({
	signupInfo: {
		realName: '',
		email: '',
		password: '',
		part: '',
		team: '',
	},
	setSignupInfo: (info) =>
		set((state) => ({
			signupInfo: { ...state.signupInfo, ...info },
		})),
}));
