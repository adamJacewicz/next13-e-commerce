import type { ProductItemResponse, ProductItemType } from "@/types";

export function formatMoney(value: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
}

export function productResponseToProductItem({
	title,
	image,
	...rest
}: ProductItemResponse): ProductItemType {
	return {
		...rest,
		name: title,
		coverImage: { src: image, alt: title },
	};
}
