import type { Metadata } from "next";
import { fetchProductById } from "@/service/product.service";
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

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const product = await fetchProductById(params.productId);
	return <ProductItemPage product={product} />;
}
