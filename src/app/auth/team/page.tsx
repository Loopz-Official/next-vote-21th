'use client';

import { useRouter } from 'next/navigation';

import SubmitButton from '@/components/common/SubmitButton';
import CustomInput from '@/components/features/auth/CustomInput';
import FormTitle from '@/components/features/auth/FormTitle';
import TeamSquadDropdown from '@/components/features/auth/TeamSquadDropdown';

export default function TeamPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 팀 선택 성공 시 홈으로 이동

    router.push('/vote/leader');
  };

  return (
    <div className="w-100 h-fit">
      <FormTitle title="Choose your Team" />

      <form
        className="w-full h-fit flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-fit flex flex-col gap-5">
          <CustomInput type="text" placeholder="Name" />
          <TeamSquadDropdown type="Team" />
          <TeamSquadDropdown type="Squad" />
        </div>
        <SubmitButton buttonText="Get Started" />
      </form>
    </div>
  );
}
