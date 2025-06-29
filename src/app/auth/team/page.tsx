'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useSignupInfo } from '@/stores/useSignupInfo';

import SubmitButton from '@/components/common/SubmitButton';
import CustomInput from '@/components/features/auth/CustomInput';
import FormTitle from '@/components/features/auth/FormTitle';
import TeamSquadDropdown from '@/components/features/auth/TeamSquadDropdown';
import { signup } from '@/services/apis/auth';

export default function TeamPage() {
	const router = useRouter();
	const realNameRef = useRef<HTMLInputElement>(null);
	const { signupInfo, setSignupInfo } = useSignupInfo();

	const [teamError, setTeamError] = useState('');
	const [squadError, setSquadError] = useState('');
	const [realNameError, setRealNameError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let hasError = false;

		if (!signupInfo.team) {
			setTeamError('팀을 선택해주세요.');
			hasError = true;
		} else {
			setTeamError('');
		}
		if (!signupInfo.part) {
			setSquadError('스쿼드를 선택해주세요.');
			hasError = true;
		} else {
			setSquadError('');
		}
		if (!signupInfo.realName) {
			setRealNameError('이름을 입력해주세요.');
			hasError = true;
		} else {
			setRealNameError('');
		}

		if (!hasError) {
			const status = await signup(signupInfo);
			if (status === 200 || status === 201) {
				router.push('/vote/leader');
			} else {
				alert('회원가입에 실패했습니다.');
			}
		}
	};

	return (
		<div className="w-100 h-fit">
			<FormTitle title="Choose your Team" />

			<form
				className="w-full h-fit flex flex-col gap-6"
				onSubmit={handleSubmit}
			>
				<div className="w-full h-fit flex flex-col gap-5">
					<TeamSquadDropdown
						type="Team"
						value={signupInfo.team}
						onChange={(value) => setSignupInfo({ team: value })}
						error={!!teamError}
						errorMessage={teamError}
					/>
					<TeamSquadDropdown
						type="Squad"
						value={signupInfo.part}
						onChange={(value) => setSignupInfo({ part: value })}
						error={!!squadError}
						errorMessage={squadError}
					/>
					<CustomInput
						type="realName"
						value={signupInfo.realName}
						placeholder="Name"
						ref={realNameRef}
						error={!!realNameError}
						errorMessage={realNameError}
					/>
				</div>
				<SubmitButton buttonText="Get Started" />
			</form>
		</div>
	);
}
