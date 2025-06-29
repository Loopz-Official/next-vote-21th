import clsx from 'clsx';
import { useState, useRef } from 'react';

import { DropdownArrow } from '@/icons/icon';
import DropdownMenu from './DropdownMenu';
import useOutsideClick from '@/hooks/useOutsideClick';

type TeamSquadDropdownProps = {
	type: 'Team' | 'Squad';
	value: string;
	onChange: (value: string) => void;
	error?: boolean;
	errorMessage?: string;
};

const TeamSquadDropdown = ({
	type,
	value,
	onChange,
	error = false,
	errorMessage = '',
}: TeamSquadDropdownProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

	const placeholder = value
		? value
		: type === 'Team'
		? 'Select Team'
		: 'Select Squad (e.g. Frontend)';

	const handleMenuClick = (menu: string) => {
		onChange(menu.toUpperCase());
		setIsDropdownOpen(false);
	};

	return (
		<div ref={dropdownRef} className="w-full h-fit relative">
			<button
				type="button"
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className={clsx(
					'input-dropdown-common flex justify-between items-center text-monochrome-300',
					value && 'text-monochrome-black',
					error && 'border-red-500 focus:outline-red-500'
				)}
			>
				{placeholder}
				<DropdownArrow />
			</button>

			{isDropdownOpen && (
				<DropdownMenu type={type} handleMenuClick={handleMenuClick} />
			)}
			{error && (
				<p className="mt-1 pl-1.5 text-sm text-red-500">{errorMessage}</p>
			)}
		</div>
	);
};

export default TeamSquadDropdown;
