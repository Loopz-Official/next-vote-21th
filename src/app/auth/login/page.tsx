'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import AccountPrompt from '@/components/features/auth/AccountPrompt';
import CustomInput from '@/components/features/auth/CustomInput';
import SubmitButton from '@/components/common/SubmitButton';
import { useSignupInfo } from '@/stores/useSignupInfo';
import { login } from '@/services/apis/auth';

export default function LoginPage() {
	const router = useRouter();

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [emailError, setEmailError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');

	const { signupInfo } = useSignupInfo();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let hasError = false;

		if (!signupInfo.email && !signupInfo.password) {
			setEmailError('이메일을 입력해주세요.');
			setPasswordError('비밀번호를 입력해주세요.');
			emailRef.current?.focus();
			hasError = true;
		} else if (!signupInfo.email) {
			setEmailError('이메일을 입력해주세요.');
			setPasswordError('');
			emailRef.current?.focus();
			hasError = true;
		} else if (!signupInfo.password) {
			setEmailError('');
			setPasswordError('비밀번호를 입력해주세요.');
			passwordRef.current?.focus();
			hasError = true;
		} else {
			setEmailError('');
			setPasswordError('');
		}

		if (!hasError) {
			const response = await login(signupInfo.email, signupInfo.password);

			if (response?.status === 200) {
				localStorage.setItem('access-token', response.token);
				router.push('/vote/leader');
			} else {
				alert('로그인에 실패했습니다.');
			}
		}
	};

	return (
		<div className="max-w-110">
			<h1 className="en-text text-5xl font-normal leading-1.2 mb-10">
				Welcome to <br />
				CEOS Vote Service
			</h1>

			<form
				className="w-full h-fit flex flex-col gap-6"
				onSubmit={handleSubmit}
			>
				<div className="w-full h-fit flex flex-col gap-5">
					<CustomInput
						type="email"
						placeholder="Email"
						value={signupInfo.email}
						ref={emailRef}
						error={!!emailError}
						errorMessage={emailError}
					/>
					<CustomInput
						type="password"
						placeholder="Password"
						value={signupInfo.password}
						ref={passwordRef}
						error={!!passwordError}
						errorMessage={passwordError}
					/>
				</div>
				<SubmitButton buttonText="Login" />
			</form>

			<AccountPrompt
				prompt="계정이 없으신가요?"
				linkText="회원가입"
				route="/auth/signup"
			/>
		</div>
	);
}
