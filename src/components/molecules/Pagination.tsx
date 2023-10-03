"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { usePagination } from "@/hooks/usePagination";

type PaginationProps = {
	total: number;
	page: number;
	pageSize?: number;
};

export function Pagination({ page, pageSize = PRODUCTS_PER_PAGE, total }: PaginationProps) {
	const { hasNextPage, hasPreviousPage, pages, getPageHref } = usePagination({
		page,
		pageSize,
		total,
	});
	if (total <= PRODUCTS_PER_PAGE) return null;

	return (
		<nav>
			<ul
				aria-label="pagination"
				className="mx-auto mt-10 flex max-w-xl justify-center gap-2 p-2 font-medium text-gray-900"
			>
				<li>
					<Link
						className={`flex aspect-square w-10 items-center justify-center rounded-md bg-slate-200 p-1 hover:bg-slate-300 ${
							!hasPreviousPage && "pointer-events-none opacity-40"
						}`}
						href={getPageHref(page - 1)}
					>
						<ChevronLeft />
					</Link>
				</li>
				{pages.map((pageNumber) => (
					<li key={pageNumber}>
						<ActiveLink
							className="flex aspect-square w-10 items-center justify-center rounded-md bg-slate-200 p-1 hover:bg-slate-300"
							activeClassName="bg-blue-600 text-white hover:bg-blue-600"
							href={getPageHref(pageNumber)}
						>
							{pageNumber}
						</ActiveLink>
					</li>
				))}
				<li>
					<Link
						className={`flex aspect-square w-10 items-center justify-center rounded-md bg-slate-200 p-1 hover:bg-slate-300 ${
							!hasNextPage && "pointer-events-none opacity-40"
						}`}
						href={getPageHref(page + 1)}
					>
						<ChevronRight />
					</Link>
				</li>
			</ul>
		</nav>
	);
}