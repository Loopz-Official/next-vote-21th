import clsx from 'clsx';

import { useSignupInfo } from '@/stores/useSignupInfo';
import VerifyButton from './VerifyButton';

type CustomInputProps = {
	type: 'realName' | 'email' | 'password';
	value: string;
	placeholder: string;
	ref: React.RefObject<HTMLInputElement | null>;
	isVerifyContained?: boolean;
	error?: boolean;
	errorMessage?: string;
};

const CustomInput = ({
	type,
	value,
	placeholder,
	ref,
	isVerifyContained = false,
	error = false,
	errorMessage = '',
}: CustomInputProps) => {
	const { setSignupInfo } = useSignupInfo();

	return (
		<div>
			<div className="relative">
				<input
					value={value}
					onChange={(e) => setSignupInfo({ [type]: e.target.value })}
					type={type}
					className={clsx(
						'input-dropdown-common text-monochrome-black focus:outline-primary-300 placeholder:text-monochrome-300',
						isVerifyContained && 'pr-25',
						error
							? 'border-red-500 focus:outline-red-500'
							: 'focus:outline-primary-300'
					)}
					placeholder={placeholder}
					ref={ref}
					autoComplete={type === 'password' ? `current-password` : 'on'}
				/>
				{isVerifyContained && <VerifyButton />}
			</div>
			{error && (
				<p className="mt-1 pl-1.5 text-sm text-red-500">{errorMessage}</p>
			)}
		</div>
	);
};

export default CustomInput;
