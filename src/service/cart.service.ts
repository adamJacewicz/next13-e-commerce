import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/lib/utils";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	type Sizes,
} from "@/gql/graphql";

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			variables: { id: cartId },
			query: CartGetByIdDocument,
			next: { tags: ["cart"] },
			cache: "no-store",
		});
		if (cart.order) return cart.order;
	}
}

export async function createCart() {
	return executeGraphql({ query: CartCreateDocument, cache: "no-store" });
}

export async function addToCart(variables: {
	orderId: string;
	productId: string;
	total: number;
	quantity: number;
	size: Sizes;
}) {
	// const product = await getProductById(productId);
	// if (!product) {
	// 	throw new Error("Product not found!");
	// }
	await executeGraphql({
		query: CartAddProductDocument,
		variables,
		cache: "no-store",
	});
	revalidateTag("cart");
}

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartFromCookies();
	if (existingCart) return existingCart;
	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Failed to create cart!");
	}
	cookies().set("cartId", cart.createOrder.id, { httpOnly: true, sameSite: "lax" });
	return cart.createOrder;
}
