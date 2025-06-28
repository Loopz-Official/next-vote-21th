'use client';

import { useRouter } from 'next/navigation';

import AccountPrompt from '@/components/features/auth/AccountPrompt';
import CustomInput from '@/components/features/auth/CustomInput';
import SubmitButton from '@/components/common/SubmitButton';
import VerifyButton from '@/components/features/auth/VerifyButton';
import FormTitle from '@/components/features/auth/FormTitle';

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 회원가입 성공 시, 팀 선택 페이지로 이동

    router.push('/auth/team');
  };

  return (
    <div className="w-100 h-fit">
      <FormTitle title="Create account" />

      <form
        className="w-full h-fit flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-fit flex flex-col gap-5">
          <div className="w-full h-fit relative">
            <CustomInput
              type="email"
              placeholder="Email"
              isVerifyContained={true}
            />
            <VerifyButton />
          </div>
          <CustomInput type="password" placeholder="Password" />
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
