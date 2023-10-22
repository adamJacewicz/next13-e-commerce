"use server";

import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/utils";
import { CartRemoveProductDocument, CartSetProductQuantityDocument } from "@/gql/graphql";

export async function changeItemQuantity(itemId: string, quantity: number) {
	if (quantity <= 0) return;
	await executeGraphql({
		variables: { quantity, itemId },
		query: CartSetProductQuantityDocument,
	});
	revalidateTag("cart");
}

export async function removeItem(itemId: string) {
	await executeGraphql({
		variables: { itemId },
		query: CartRemoveProductDocument,
	});
	// revalidateTag("cart");
}
