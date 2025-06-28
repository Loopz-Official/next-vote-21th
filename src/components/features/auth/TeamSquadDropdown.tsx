import { useState } from 'react';

import { DropdownArrow } from '@/icons/icon';
import DropdownMenu from './DropdownMenu';
import clsx from 'clsx';

type TeamSquadDropdownProps = {
  type: 'Team' | 'Squad';
};

const TeamSquadDropdown = ({ type }: TeamSquadDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  const placeholder = selectedMenu
    ? selectedMenu
    : type === 'Team'
    ? 'Select Team'
    : 'Select Squad (e.g. Frontend)';

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full h-fit relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={clsx(
          'input-dropdown-common flex justify-between items-center text-monochrome-300',
          selectedMenu && 'text-monochrome-black'
        )}
      >
        {placeholder}
        <DropdownArrow />
      </button>

      {isDropdownOpen && (
        <DropdownMenu type={type} handleMenuClick={handleMenuClick} />
      )}
    </div>
  );
};

export default TeamSquadDropdown;
