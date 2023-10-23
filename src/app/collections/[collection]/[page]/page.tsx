import type { Metadata } from "next";
import { getProductsListByCollection } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";
import { getCollectionBySlug } from "@/service/collections.service";
import { PageHeader } from "@/components/atoms/PageHeader";

export async function generateMetadata({
	params,
}: {
	params: { collection: string };
}): Promise<Metadata> {
	const collection = await getCollectionBySlug(params.collection);

	return {
		title: collection?.name ?? "",
	};
}

export default async function CollectionPage({
	params,
}: {
	params: { collection: string; page: string };
}) {
	const page = Number(params.page);

	const [{ products, pageInfo, count }, collection] = await Promise.all([
		getProductsListByCollection({
			slug: params.collection,
			page,
		}),
		getCollectionBySlug(params.collection),
	]);

	return products.length === 0 ? (
		<h2>No products</h2>
	) : (
		<>
			<PageHeader>{collection.name}</PageHeader>
			<ProductList products={products} />
			<Pagination
				hasPreviousPage={pageInfo.hasPreviousPage}
				hasNextPage={pageInfo.hasNextPage}
				basePath={`/collections/${params.collection}`}
				page={page}
				total={count}
			/>
		</>
	);
}
