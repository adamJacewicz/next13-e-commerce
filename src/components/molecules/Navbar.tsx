import Link from "next/link";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { navLinks } from "@/constants";
import { SearchForm } from "@/components/atoms/SearchForm";

export const Navbar = () => {
	return (
		<div className="mx-auto max-w-screen-2xl">
			<div className="flex items-center gap-10">
				<Link
					className="whitespace-nowrap px-2 py-1 text-xl font-bold uppercase tracking-tight focus:outline-none focus:ring"
					href="/"
				>
					E-commerce
				</Link>

				<nav>
					<ul className="flex items-center gap-3">
						{navLinks.map((link) => (
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
				<SearchForm />
			</div>
		</div>
	);
};
