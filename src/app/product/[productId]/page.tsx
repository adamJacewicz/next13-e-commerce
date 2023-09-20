import type { Metadata } from "next";
import { fetchProductById } from "@/service/product.service";
import { ProductRating } from "@/ui/atoms/ProductRating";
import { ProductListItemHead } from "@/ui/atoms/ProductListItemHead";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

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
	return (
		<main className="mx-auto flex max-w-2xl">
			<div className="flex-1">
				<ProductCoverImage src={product.coverImage.src} alt={product.name} />
			</div>

			<div className="flex flex-1 flex-col gap-4 px-4 py-2">
				<ProductListItemHead product={product} />
				<ProductRating rating={product.rating.rate} />
				<button
					type="submit"
					className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
				>
					Add to cart
				</button>
				<ProductListItemDescription product={product} />
			</div>
		</main>
	);
}
