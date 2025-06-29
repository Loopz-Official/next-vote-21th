'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import AccountPrompt from '@/components/features/auth/AccountPrompt';
import CustomInput from '@/components/features/auth/CustomInput';
import SubmitButton from '@/components/common/SubmitButton';
import FormTitle from '@/components/features/auth/FormTitle';
import { useSignupInfo } from '@/stores/useSignupInfo';

export default function SignupPage() {
	const router = useRouter();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [emailError, setEmailError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');

	const { signupInfo } = useSignupInfo();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
			router.push('/auth/team');
		}
	};

	return (
		<div className="w-100 h-fit">
			<FormTitle title="Create account" />

			<form
				className="w-full h-fit flex flex-col gap-6"
				onSubmit={handleSubmit}
			>
				<div className="w-full h-fit flex flex-col gap-5">
					<CustomInput
						type="email"
						value={signupInfo.email}
						placeholder="Email"
						ref={emailRef}
						isVerifyContained={true}
						error={!!emailError}
						errorMessage={emailError}
					/>

					<CustomInput
						type="password"
						value={signupInfo.password}
						placeholder="Password"
						ref={passwordRef}
						error={!!passwordError}
						errorMessage={passwordError}
					/>
				</div>
				<SubmitButton buttonText="Sign Up" />
			</form>

			<AccountPrompt
				prompt="이미 회원이신가요?"
				linkText="로그인"
				route="/auth/login"
			/>
		</div>
	);
}
