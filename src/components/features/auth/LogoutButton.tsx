import { LogoutIcon } from '@/icons/icon';
import { logout } from '@/services/apis/auth';

const LogoutButton = () => {
	const handleLogout = async () => {
		const response = await logout();

		if (response === 200) {
			localStorage.removeItem('access-token');
			window.location.href = '/';
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="py-3 px-4 flex items-center gap-4 bg-black rounded-xl text-white en-text font-regular text-base"
		>
			<LogoutIcon />
			Logout
		</button>
	);
};

export default LogoutButton;
