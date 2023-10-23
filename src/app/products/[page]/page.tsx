import { getProductList } from "@/service/product.service";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";
import { PageHeader } from "@/components/atoms/PageHeader";

type ProductsPageParams = {
	page: string;
};

// export async function generateStaticParams() {
// 	const { count } = await getProductList();
// 	return Array.from({ length: Math.ceil(count / PRODUCTS_PER_PAGE) }, (_, i) => ({
// 		page: `${i + 1}`,
// 	}));
// }
export default async function ProductsPage({ params }: { params: ProductsPageParams }) {
	const page = Number(params.page);
	const { products, pageInfo, count } = await getProductList({
		page: page,
		perPage: PRODUCTS_PER_PAGE,
	});

	return (
		<>
			<PageHeader>All products</PageHeader>
			<ProductList products={products} />
			<Pagination
				hasNextPage={pageInfo.hasNextPage}
				hasPreviousPage={pageInfo.hasPreviousPage}
				basePath="/products"
				page={page}
				total={count}
			/>
		</>
	);
}
