import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

type PaginationProps = {
	total: number;
	page: number;
	pageSize?: number;
};

export function Pagination({ page, pageSize = 10, total }: PaginationProps) {
	const totalPages = Math.ceil(total / pageSize);
	const visiblePages = Math.min(9, totalPages);
	const siblingCount = Math.floor(visiblePages / 2);

	const pages = Array.from({ length: visiblePages }, (_, i) => {
		if (page + siblingCount >= totalPages) return totalPages - visiblePages + i + 1;
		if (page - siblingCount <= 0) return i + 1;
		return i + page - siblingCount;
	});

	const hasNextPage = page !== totalPages;
	const hasPreviousPage = page !== 1;

	return (
		<ul
			aria-label="pagination"
			className="mx-auto mt-10 flex max-w-xl justify-center gap-2 p-2 font-medium text-gray-900"
		>
			<li>
				<Link
					className={twMerge(
						"flex aspect-square w-10 items-center justify-center rounded-md bg-slate-200 p-1 hover:bg-slate-300",
						!hasPreviousPage && "pointer-events-none bg-opacity-50",
					)}
					href={`/products/${page - 1}`}
				>
					&#60;
				</Link>
			</li>
			{pages.map((pageNumber) => (
				<li key={pageNumber}>
					<ActiveLink
						className="flex aspect-square w-10 items-center justify-center rounded-md bg-slate-200 p-1 hover:bg-slate-300"
						activeClassName="bg-gray-900 text-white hover:bg-gray-800"
						href={`/products/${pageNumber}`}
					>
						{pageNumber}
					</ActiveLink>
				</li>
			))}
			<li>
				<Link
					className={twMerge(
						"flex aspect-square w-10 items-center justify-center rounded-md bg-slate-200 p-1 hover:bg-slate-300",
						!hasNextPage && "pointer-events-none bg-opacity-50",
					)}
					href={`/products/${page + 1}`}
				>
					&#62;
				</Link>
			</li>
		</ul>
	);
}
