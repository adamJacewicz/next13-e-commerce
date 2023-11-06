import Link from "next/link";
import { Suspense } from "react";
import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { NAV_LINKS } from "@/constants";
import { SearchForm } from "@/components/atoms/SearchForm";
import { getCategoryList } from "@/service/categories.service";
import { type NavLink } from "@/types/types";
import { getCartFromCookies } from "@/service/cart.service";

export async function Navbar() {
	const [cart, categories] = await Promise.all([getCartFromCookies(), getCategoryList()]);
	const quantity = cart?.orderItems.reduce((result, item) => result + item.quantity, 0) ?? 0;

	const categoryLinks: NavLink[] = categories.map((category) => ({
		exact: false,
		label: category.name,
		href: `/categories/${category.slug}` as Route,
	}));

	return (
		<div className="mx-auto max-w-screen-2xl">
			<div className="flex items-center justify-between gap-10">
				<Link
					className="whitespace-nowrap px-2 py-1 text-xl font-bold uppercase tracking-tight focus:outline-none focus:ring"
					href="/"
				>
					E-commerce
				</Link>

				<nav>
					<ul className="flex items-center gap-3">
						{[...NAV_LINKS, ...categoryLinks].map((link) => (
							<li key={link.href}>
								<ActiveLink
									activeClassName="text-blue-600 border-b-blue-600"
									className="block whitespace-nowrap border border-transparent px-2 py-4 text-sm font-medium focus:outline-none focus:ring"
									exact={link.exact}
									href={link.href}
								>
									{link.label}
								</ActiveLink>
							</li>
						))}
					</ul>
				</nav>
				<Suspense>
					<div className="flex items-center gap-3">
						<SearchForm />
						<Link href="/cart/sidebar" className="flex items-center">
							<ShoppingCart aria-hidden="true" />
							<span className="ml-2 text-sm font-medium">{quantity}</span>
							<span className="sr-only">items in cart</span>
						</Link>
					</div>
				</Suspense>
			</div>
		</div>
	);
}
