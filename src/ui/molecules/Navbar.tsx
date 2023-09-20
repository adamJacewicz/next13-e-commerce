import { ActiveLink } from "@/ui/atoms/ActiveLink";

type NavLinks = "/" | `/products`;

const navLinkList: Array<{ href: NavLinks; label: string; exact: boolean }> = [
	{
		href: "/",
		exact: true,
		label: "Home",
	},
	{
		exact: false,
		href: "/products",
		label: "All",
	},
];

export const Navbar = () => {
	return (
		<nav>
			<ul className="flex justify-center space-x-4 p-4 text-xl">
				{navLinkList.map((link) => (
					<li key={link.label}>
						<ActiveLink
							exact={link.exact}
							className="font-medium text-blue-300"
							activeClassName="underline"
							href={link.href}
						>
							{link.label}
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
