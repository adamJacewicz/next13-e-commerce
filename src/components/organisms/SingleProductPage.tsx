import { ProductImage } from "@/components/atoms/ProductImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { type ProductListItemFragment, type ProductVariantsFragment } from "@/gql/graphql";
import { Select } from "@/components/atoms/Select";
import { formatMoney, productVariantToSelectOption } from "@/utils";
import { AddToCartButton } from "@/components/atoms/AddToCartButton";
import { addToCart, getOrCreateCart } from "@/service/cart.service";

type ProductListPageProps = {
	product: ProductListItemFragment & ProductVariantsFragment;
};

export async function SingleProductPage({ product }: ProductListPageProps) {
	const variants = product.variants.map(productVariantToSelectOption);

	async function addToCartAction() {
		"use server";
		const cart = await getOrCreateCart();
		const productId = product.id;
		const orderItem = cart?.orderItems?.find((item) => item?.product?.id === productId);
		await addToCart({
			orderId: orderItem ? orderItem.id : cart.id,
			productId,
			quantity: orderItem ? orderItem?.quantity + 1 : 1,
			total: orderItem ? product.price * (orderItem.quantity + 1) : product.price,
		});
	}

	return (
		<article className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<header>
				<ProductImage src={product.images[0].url} alt={product.name} />
			</header>

			<div className="flex flex-1 flex-col gap-4 px-4 py-2">
				<div>
					<div className="flex flex-wrap items-center justify-between gap-2 font-medium text-gray-700 sm:text-xl">
						<h1>{product.name}</h1>
						<p>{formatMoney(product.price / 100)}</p>
					</div>
					<div className="mt-1 flex items-center gap-2 text-gray-500 sm:text-lg">
						{product.categories.map(({ id, name }) => (
							<span key={id}>{name}</span>
						))}
					</div>
				</div>

				{variants.length ? (
					<Select defaultFirstOption label="Select variant" options={variants} />
				) : null}

				<form action={addToCartAction}>
					<AddToCartButton />
				</form>

				<ProductListItemDescription product={product} />
			</div>
		</article>
	);
}
