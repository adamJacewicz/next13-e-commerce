import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemHead } from "@/ui/atoms/ProductListItemHead";
import { ProductRating } from "@/ui/atoms/ProductRating";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { fetchProductById } from "@/service/product.service";

type ProductListPageProps = {
	productId: string;
};

export async function ProductItemPage({ productId }: ProductListPageProps) {
	const product = await fetchProductById(productId);

	return (
		<article className="mx-auto flex max-w-2xl">
			<header className="flex-1">
				<ProductCoverImage src={product.coverImage.src} alt={product.name} />
			</header>

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
		</article>
	);
}
