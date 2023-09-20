"use client";
import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

interface ActiveLinkProps<T extends string> extends LinkProps<T> {
	className?: string;
	href: Route<T>;
	activeClassName: string;
	children: ReactNode;
	exact?: boolean;
}

export function ActiveLink<T extends string>({
	children,
	activeClassName,
	className,
	href,
	exact,
	...rest
}: ActiveLinkProps<T>) {
	const pathName = usePathname();
	const isActive = !!exact ? href === pathName : pathName.startsWith(href);
	return (
		<Link
			{...(isActive ? { "aria-current": "page" } : {})}
			href={href}
			className={twMerge(className, isActive && activeClassName)}
			{...rest}
		>
			{children}
		</Link>
	);
}
