import Link from "next/link";
import { Suspense } from "react";
import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
		<div className="mx-auto flex max-w-screen-2xl items-center justify-between">
			<nav>
				<ul className="flex items-center gap-3">
					<li>
						<Link
							className="whitespace-nowrap px-2 py-1 text-xl font-bold uppercase tracking-tight focus:outline-none focus:ring"
							href="/"
						>
							E-commerce
						</Link>
					</li>
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
					<Link
						href={cart?.orderItems.length ? `/cart/sidebar` : `/cart`}
						className="relative mr-1 flex items-center p-1"
					>
						<ShoppingCart aria-hidden="true" />

						<span className="absolute right-0 top-0 flex h-[18px] w-[18px] -translate-y-1/3 translate-x-1/2 items-center justify-center rounded-full bg-slate-900 text-xs	font-semibold leading-none text-white">
							{quantity}
						</span>
					</Link>
					<SignedIn>
						<UserButton userProfileMode="navigation" />
					</SignedIn>
					<SignedOut>
						<SignInButton />
					</SignedOut>
				</div>
			</Suspense>
		</div>
	);
}
