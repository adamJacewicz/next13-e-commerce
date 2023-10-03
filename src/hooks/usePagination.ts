import { usePathname } from "next/navigation";
import type { Route } from "next";

export function usePagination({
	pageSize,
	total,
	page,
}: {
	total: number;
	pageSize: number;
	page: number;
}) {
	const totalPages = Math.ceil(total / pageSize);
	const visiblePages = Math.min(9, totalPages);
	const siblingCount = Math.floor(visiblePages / 2);
	const pathName = usePathname();
	const basePath = pathName.replace(/(\/\d+)$/gi, "");
	const getPageHref = (page: number | string) => `${basePath}/${page}` as Route;

	const pages = Array.from({ length: visiblePages }, (_, i) => {
		if (page + siblingCount >= totalPages) return totalPages - visiblePages + i + 1;
		if (page - siblingCount <= 0) return i + 1;
		return i + page - siblingCount;
	});

	const hasNextPage = page !== totalPages;
	const hasPreviousPage = page !== 1;

	return {
		getPageHref,
		totalPages,
		visiblePages,
		siblingCount,
		basePath,
		hasNextPage,
		hasPreviousPage,
		pages,
	};
}
