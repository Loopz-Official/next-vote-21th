'use client';

import { useRouter } from 'next/navigation';

import AccountPrompt from '@/components/features/auth/AccountPrompt';
import CustomInput from '@/components/features/auth/CustomInput';
import SubmitButton from '@/components/common/SubmitButton';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 로그인 성공 시, 팀 선택된 상태면 홈으로 이동 (팀 선택 안된 상태면 팀 선택 페이지로 이동)

    router.push('/vote/leader');
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
          <CustomInput type="email" placeholder="Email" />
          <CustomInput type="password" placeholder="Password" />
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
