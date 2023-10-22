import { type NavLink } from "@/types/types";

export const PRODUCTS_PER_PAGE = 4;

export const navLinks: NavLink[] = [
	{
		label: "Home",
		href: "/",
	},
	{
		exact: false,
		label: "All",
		href: "/products",
	},
];
