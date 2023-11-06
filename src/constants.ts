import { type NavLink, type OrderType } from "@/types/types";

export const PRODUCTS_PER_PAGE = 4;

export const NAV_LINKS: NavLink[] = [
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

export const ORDER_OPTIONS: OrderType[] = [
	{ label: "Name - descending", value: "name_DESC", type: "name" },
	{ label: "Name - ascending", value: "name_ASC", type: "name" },
	{ label: "Price - descending", value: "price_DESC", type: "price" },
	{ label: "Price - ascending", value: "price_ASC", type: "price" },
	{ label: "Rating - descending", value: "averageRating_DESC", type: "rating" },
	{ label: "Rating - ascending", value: "averageRating_ASC", type: "rating" },
];
