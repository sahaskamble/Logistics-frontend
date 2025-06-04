import { ROLES } from '@/constants/roles';

export const RoleCheckByPathName = (path) => {
	switch (path) {
		case "/customer/login":
			return ROLES.CUSTOMER;

		case "/client/login":
			return ROLES.MERCHANT;

		case "/gol/login":
			return ROLES.GOL_STAFF; // Default to GOL_STAFF, can be changed to GOL_MOD

		case "/admin/login":
			return ROLES.ROOT;

		default:
			return null;
	}
}

// Helper to determine role from URL path
export const getRoleFromPath = (pathname) => {
	if (pathname.includes('/customer/')) return ROLES.CUSTOMER;
	if (pathname.includes('/client/')) return ROLES.MERCHANT;
	if (pathname.includes('/gol/')) return ROLES.GOL_STAFF;
	if (pathname.includes('/admin/')) return ROLES.ROOT;
	return null;
};
