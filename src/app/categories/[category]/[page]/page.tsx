import type { Metadata } from "next";
import { getProductsListByCategory } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";
import { getCategoryBySlug } from "@/service/categories.service";
import { PageHeader } from "@/components/atoms/PageHeader";
import { type ProductOrderByInput } from "@/gql/graphql";
import { SortSelect } from "@/components/molecules/SortSelect";

type CategoryPageProps = {
	params: { category: string; page: string };
	searchParams: { order: ProductOrderByInput };
};

export async function generateMetadata({
	params,
}: {
	params: { category: string };
}): Promise<Metadata> {
	const category = await getCategoryBySlug(params.category);

	return {
		title: category?.name ?? "",
	};
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
	const page = Number(params.page);
	const { order } = searchParams;

	const [{ products, pageInfo, count }, category] = await Promise.all([
		getProductsListByCategory({
			slug: params.category,
			page,
			order,
		}),
		getCategoryBySlug(params.category),
	]);

	return products.length === 0 ? (
		<h2>No products</h2>
	) : (
		<>
			<header className="flex items-center justify-between">
				<PageHeader>{category.name}</PageHeader>
				<SortSelect />
			</header>
			<ProductList products={products} />
			<Pagination
				hasNextPage={pageInfo.hasNextPage}
				hasPreviousPage={pageInfo.hasPreviousPage}
				basePath={`/categories/${params.category}`}
				page={page}
				total={count}
			/>
		</>
	);
}
