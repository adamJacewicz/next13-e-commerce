import type { ProductItemResponse, ProductItemType } from "@/types";

export function formatMoney(value: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
}

export function productResponseToProductItem(product: ProductItemResponse): ProductItemType {
	return {
		id: product.id,
		category: product.category,
		name: product.title,
		price: product.price,
		rating: product.rating,
		description: product.description,
		longDescription: product.longDescription,
		coverImage: { src: product.image, alt: product.title },
	};
}
