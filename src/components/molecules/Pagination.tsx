import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { PRODUCTS_PER_PAGE } from "@/constants";

type PaginationProps = {
	total: number;
	page: number;
	pageSize?: number;
	pathName: string;
};

export function Pagination({
	page,
	pageSize = PRODUCTS_PER_PAGE,
	total,
	pathName,
}: PaginationProps) {
	const totalPages = Math.ceil(total / pageSize);
	const visiblePages = Math.min(9, totalPages);
	const siblingCount = Math.floor(visiblePages / 2);
	const getPageHref = (page: number | string) => `${pathName}/${page}` as Route;

	const pages = Array.from({ length: visiblePages }, (_, i) => {
		if (page + siblingCount >= totalPages) return totalPages - visiblePages + i + 1;
		if (page - siblingCount <= 0) return i + 1;
		return i + page - siblingCount;
	});

	const hasNextPage = page !== totalPages;
	const hasPreviousPage = page !== 1;

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
						prefetch={hasPreviousPage}
						href={`${pathName}/${page - 1}` as Route}
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
						prefetch={hasNextPage}
						href={`${pathName}/${page + 1}` as Route}
					>
						<ChevronRight />
					</Link>
				</li>
			</ul>
		</nav>
	);
}
