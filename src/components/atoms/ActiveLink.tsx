"use client";
import Link, { type LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Route } from "next";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActiveLinkProps<T extends string> extends LinkProps<T> {
	activeClassName: string;
	children: ReactNode;
	exact?: boolean;
	href: Route<T>;
	className: string;
}

export function ActiveLink<T extends string>({
	children,
	activeClassName,
	className,
	href,
	exact = true,
	...rest
}: ActiveLinkProps<T>) {
	let pathName = usePathname();
	const searchParams = useSearchParams();
	if (searchParams.size) {
		pathName = `${pathName}?${searchParams.toString()}`;
	}
	const isActive = !!exact ? href === pathName : pathName.startsWith(href);

	return (
		<Link
			aria-current={isActive ? "page" : undefined}
			href={href}
			className={cn(className, isActive && activeClassName)}
			{...rest}
		>
			{children}
		</Link>
	);
}
