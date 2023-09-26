import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/molecules/Pagination";
import { fetchProducts } from "@/service/product.service";

type ProductsPageParams = {
	pageNumber: string;
};

const PER_PAGE = 10;

export async function generateStaticParams() {
	return Array.from({ length: 50 / PER_PAGE }, (_, i) => `${i + 1}`).map((pageNumber) => ({
		pageNumber,
	}));
}
export default async function ProductsPage({ params }: { params: ProductsPageParams }) {
	const page = Number(params.pageNumber);
	const { products, totalCount } = await fetchProducts({ page });

	return (
		<div className="flex flex-col">
			<ProductList products={products} />
			<Pagination page={page} total={totalCount} />
		</div>
	);
}
