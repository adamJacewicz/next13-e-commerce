import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Navbar = () => {
	return (
		<nav>
			<ul className="flex justify-center space-x-4 p-4 text-xl">
				<li>
					<ActiveLink
						activeClassName="underline"
						className="font-medium text-blue-300"
						exact={true}
						href="/"
					>
						Home
					</ActiveLink>
				</li>
				<li>
					<ActiveLink
						activeClassName="underline"
						className="font-medium text-blue-300"
						exact={false}
						href="/products/1"
					>
						All
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
