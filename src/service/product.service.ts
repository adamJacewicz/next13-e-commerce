import type { ProductItemResponse, ProductItemType } from "@/types";
import { productResponseToProductItem } from "@/app/utils";

export async function fetchProducts({
	perPage = 20,
	page = 1,
}: {
	perPage: number;
	page?: number;
}): Promise<ProductItemType[]> {
	const offset = perPage * (page - 1);
	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${perPage}&offset=${offset}`,
	);
	const products = (await response.json()) as ProductItemResponse[];

	return products.map(productResponseToProductItem);
}

export async function fetchProductById(id: string): Promise<ProductItemType> {
	const response = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	const product = (await response.json()) as ProductItemResponse;
	return productResponseToProductItem(product);
}
