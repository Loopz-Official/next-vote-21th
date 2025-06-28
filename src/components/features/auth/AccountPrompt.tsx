import Link from 'next/link';

type AccountPromptProps = {
  prompt: string;
  linkText: string;
  route: string;
};

const AccountPrompt = ({ prompt, linkText, route }: AccountPromptProps) => {
  return (
    <div className="w-full h-fit flex justify-center items-center gap-2 mt-6">
      <span>{prompt}</span>
      <Link href={route} className="font-semibold">
        {linkText}
      </Link>
    </div>
  );
};

export default AccountPrompt;
