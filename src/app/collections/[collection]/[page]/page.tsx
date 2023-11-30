import type { Metadata } from "next";
import { getProductsListByCollection } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";
import { getCollectionBySlug } from "@/service/collections.service";
import { PageHeader } from "@/components/atoms/PageHeader";
import { SortSelect } from "@/components/molecules/SortSelect";
import { type ProductOrderByInput } from "@/gql/graphql";

type CollectionPageProps = {
	params: { collection: string; page: string };
	searchParams: { order: ProductOrderByInput };
};

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

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
	const page = Number(params.page);
	const [{ products, pageInfo, count }, collection] = await Promise.all([
		getProductsListByCollection({
			slug: params.collection,
			page,
			order: searchParams.order,
		}),
		getCollectionBySlug(params.collection),
	]);

	return products.length === 0 ? (
		<h2>No products</h2>
	) : (
		<>
			<header className="flex items-center justify-between">
				<PageHeader>{collection.name}</PageHeader>
				<SortSelect />
			</header>
			<ProductList products={products} />
			<Pagination
				basePath={`/collections/${params.collection}`}
				hasPreviousPage={pageInfo.hasPreviousPage}
				hasNextPage={pageInfo.hasNextPage}
				page={page}
				total={count}
			/>
		</>
	);
}
