"use client";
import { twMerge } from "tailwind-merge";
import Link, { type LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Route } from "next";

interface ActiveLinkProps<T extends string> extends LinkProps<T> {
	activeClassName: string;
	exact?: boolean;
	href: Route<T>;
}

export function ActiveLink<T extends string>({
	children,
	activeClassName,
	className,
	href,
	exact = true,
	...rest
}: ActiveLinkProps<T>) {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	let path = pathName;
	if (searchParams.size) {
		path = `${path}?${searchParams.toString()}`;
	}
	const isActive = !!exact ? href === path : path.startsWith(href);

	return (
		<Link
			aria-current={isActive ? "page" : undefined}
			href={href}
			className={twMerge(className, isActive && activeClassName)}
			{...rest}
		>
			{children}
		</Link>
	);
}
