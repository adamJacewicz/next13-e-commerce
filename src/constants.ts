import type { Route } from "next";

export const PRODUCTS_PER_PAGE = 4;

export const navLinks: { exact?: boolean; label: string; href: Route }[] = [
	{
		label: "Home",
		href: "/",
	},
	{
		exact: false,
		label: "All",
		href: "/products",
	},
	{
		exact: false,
		label: "Summer Vibes",
		href: "/collections/summer-vibes" as Route,
	},
	{
		exact: false,
		label: "New Arrivals",
		href: "/collections/new-arrivals" as Route,
	},
	{
		exact: false,
		label: "Elegant Extras",
		href: "/collections/elegant-extras" as Route,
	},
	{
		exact: false,
		label: "T-shirts",
		href: "/categories/t-shirts" as Route,
	},
	{
		exact: false,
		label: "Hoodies",
		href: "/categories/hoodies" as Route,
	},
	{
		exact: false,
		label: "Accessories",
		href: "/categories/accessories" as Route,
	},
];
