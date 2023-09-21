import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/molecules/Pagination";

type ProductsPageParams = {
	pageNumber: string;
};

const TOTAL = 100;
const PER_PAGE = 20;

export async function generateStaticParams() {
	return Array.from({ length: TOTAL / PER_PAGE }, (_, i) => i + 1).map((pageNumber) => ({
		pageNumber: pageNumber.toString(),
	}));
}

export default async function ProductsPage({ params }: { params: ProductsPageParams }) {
	const page = Number(params.pageNumber);
	const totalPages = Math.ceil(TOTAL / PER_PAGE);
	if (page > totalPages || page <= 0) {
		redirect("/products/1");
	}

	return (
		<>
			<Suspense>
				<ProductList page={page} />
			</Suspense>
			<Pagination page={page} total={TOTAL} />
		</>
	);
}
