import type { Metadata } from "next";
import { getProductsListByCollection } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";
import { getCollectionBySlug } from "@/service/collections.service";

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

	const [{ products, count }, collection] = await Promise.all([
		getProductsListByCollection({
			slug: params.collection,
			page,
		}),
		getCollectionBySlug(params.collection),
	]);
	return products.length === 0 ? (
		<h2>No products</h2>
	) : (
		<div className="flex flex-col">
			<h2>{collection.name}</h2>
			<ProductList products={products} />
			<Pagination page={page} total={count} />
		</div>
	);
}
