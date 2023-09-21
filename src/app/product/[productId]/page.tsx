import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchProductById, fetchProducts } from "@/service/product.service";
import { ProductItemPage } from "@/ui/organisms/ProductItemPage";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = await fetchProductById(params.productId);
	return {
		title: product.name,
		description: product.description,
	};
}
export async function generateStaticParams() {
	const products = await fetchProducts({ perPage: 100, page: 1 });
	return products.map((product) => ({ productId: product.id }));
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	return (
		<Suspense>
			<ProductItemPage productId={params.productId} />
		</Suspense>
	);
}
