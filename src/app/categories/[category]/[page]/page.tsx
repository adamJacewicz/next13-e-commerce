import type { Metadata } from "next";
import { getProductsListByCategory } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";
import { getCategoryBySlug } from "@/service/categories.service";
import { PageHeader } from "@/components/atoms/PageHeader";

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

export default async function CategoryPage({
	params,
}: {
	params: { category: string; page: string };
}) {
	const page = Number(params.page);

	const [{ products, pageInfo, count }, category] = await Promise.all([
		getProductsListByCategory({
			slug: params.category,
			page,
		}),
		getCategoryBySlug(params.category),
	]);
	return products.length === 0 ? (
		<h2>No products</h2>
	) : (
		<>
			<PageHeader>{category.name}</PageHeader>
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
