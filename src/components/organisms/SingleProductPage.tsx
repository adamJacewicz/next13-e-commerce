import { ProductImage } from "@/components/atoms/ProductImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { type ProductListItemFragment, type ProductVariantsFragment } from "@/gql/graphql";
import { formatMoney, productVariantToSelectOption } from "@/utils";
import { AddToCartButton } from "@/components/atoms/AddToCartButton";
import { addToCart, getOrCreateCart } from "@/service/cart.service";
import { Rating } from "@/components/molecules/Rating";
import { ReviewForm } from "@/components/molecules/ReviewForm";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

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
		<>
			<section className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<ProductImage src={product.images[0].url} alt={product.name} />
				</div>

				<main className="flex flex-1 flex-col gap-4 px-4 py-2">
					<div className="flex flex-wrap items-center justify-between gap-2 font-medium text-gray-700 sm:text-xl">
						<h1>{product.name}</h1>
						<p>{formatMoney(product.price / 100)}</p>
					</div>
					<div className="flex items-center gap-2">
						<Rating rating={product.averageRating as number} />
					</div>
					<div className="mt-1 flex items-center gap-2 text-gray-500 sm:text-lg">
						{product.categories.map(({ id, name }) => (
							<span key={id}>{name}</span>
						))}
					</div>

					{variants.length ? (
						<Select defaultValue={variants[0].value}>
							<SelectTrigger className="">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{variants.map((variant) => (
										<SelectItem key={variant.value} value={variant.value}>
											{variant.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					) : null}

					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
					<ProductListItemDescription product={product} />
				</main>
			</section>
			<ReviewForm reviews={product.reviews} productId={product.id} />
		</>
	);
}
