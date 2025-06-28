import { SQUAD_LIST, TEAM_LIST } from '@/constants/teamSquad';

type DropdownMenuProps = {
  type: 'Team' | 'Squad';
  handleMenuClick: (menu: string) => void;
};

const DropdownMenu = ({ type, handleMenuClick }: DropdownMenuProps) => {
  const renderedList = type === 'Team' ? TEAM_LIST : SQUAD_LIST;

  return (
    <ul className="absolute top-[106%] left-0 z-10 w-full h-fit bg-monochrome-white border-[1.5px] border-monochrome-200 rounded-xl">
      {renderedList.map((team, index) => (
        <li key={index} className="w-full h-fit p-1">
          <button
            type="button"
            onClick={() => handleMenuClick(team)}
            className="w-full h-fit p-3 rounded-lg flex en-text text-xl hover:bg-primary-500 hover:text-monochrome-white"
          >
            {team}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
