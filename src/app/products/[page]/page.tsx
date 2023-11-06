import { getProductList } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";
import { PageHeader } from "@/components/atoms/PageHeader";
import { type ProductOrderByInput } from "@/gql/graphql";
import { SortSelect } from "@/components/molecules/SortSelect";

type ProductsPageProps = {
	params: {
		page: string;
	};
	searchParams: {
		order: ProductOrderByInput;
	};
};

// export async function generateStaticParams() {
// 	const count = await getProductsCount();
// 	return Array.from({ length: Math.ceil(count / PRODUCTS_PER_PAGE) }, (_, i) => ({
// 		page: `${i + 1}`,
// 	}));
// }
export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
	const page = Number(params.page);
	const { order } = searchParams;
	const { products, pageInfo, count } = await getProductList({
		page,
		order,
	});
	return (
		<>
			<header className="flex items-center justify-between">
				<PageHeader>All products</PageHeader>
				<SortSelect />
			</header>
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
