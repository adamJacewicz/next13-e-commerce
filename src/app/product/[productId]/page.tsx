import type { Metadata } from "next";
import { Suspense } from "react";
import { SingleProductPage } from "@/components/organisms/SingleProductPage";
import { getProductById } from "@/service/product.service";
import { ProductRecommendationList } from "@/components/molecules/ProductRecommendationList";
import { LoadingIndicator } from "@/components/atoms/LoadingIndicator";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = await getProductById(params.productId);
	return {
		title: product?.name,
		description: product?.description,
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);
	if (!product) return null;
	return (
		<div>
			<SingleProductPage product={product} />
			<Suspense fallback={<LoadingIndicator />}>
				<aside className="mt-12">
					<ProductRecommendationList />
				</aside>
			</Suspense>
		</div>
	);
}
