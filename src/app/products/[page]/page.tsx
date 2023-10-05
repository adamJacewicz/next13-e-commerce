import { getProductList } from "@/service/product.service";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";

type ProductsPageParams = {
	page: string;
};

export async function generateStaticParams() {
	const { count } = await getProductList();
	return Array.from({ length: Math.ceil(count / PRODUCTS_PER_PAGE) }, (_, i) => ({
		page: `${i + 1}`,
	}));
}
export default async function ProductsPage({ params }: { params: ProductsPageParams }) {
	const page = Number(params.page);
	const { products, count } = await getProductList({
		page: page,
		perPage: PRODUCTS_PER_PAGE,
	});
	return (
		<div className="flex flex-col">
			<ProductList products={products} />
			<Pagination pathName="/products" page={page} total={count} />
		</div>
	);
}
