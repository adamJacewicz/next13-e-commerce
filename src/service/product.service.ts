import type { ProductItemResponse, ProductItemType } from "@/types";
import { productResponseToProductItem } from "@/app/utils";

type FetchProductsResponseType = {
	products: ProductItemType[];
	totalCount: number;
};

export async function fetchProducts({
	perPage = 10,
	page = 1,
}: {
	perPage?: number;
	page: number;
}): Promise<FetchProductsResponseType> {
	const offset = perPage * (page - 1);
	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${perPage}&offset=${offset}`,
	);
	const products = (await response.json()) as ProductItemResponse[];
	return {
		products: products.map(productResponseToProductItem),
		totalCount: 50,
	};
}

export async function fetchProductById(id: string): Promise<ProductItemType> {
	const response = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	const product = (await response.json()) as ProductItemResponse;
	return productResponseToProductItem(product);
}
