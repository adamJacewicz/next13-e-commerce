import React from "react";
import Image from "next/image";
import { type CartFragment } from "@/gql/graphql";
import { ChangeQuantity } from "@/app/cart/ChangeQuantity";
import { RemoveButton } from "@/app/cart/RemoveButton";
import { formatMoney } from "@/lib/utils";
import { type ArrElement } from "@/types/types";

export function CartProduct({ orderItem }: { orderItem: ArrElement<CartFragment["orderItems"]> }) {
	if (!orderItem.product) return null;
	return (
		<li className="flex gap-4 py-6">
			<div className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200">
				<Image
					src={orderItem.product.images[0].url}
					alt={orderItem.product.name}
					width="128"
					height="128"
				/>
			</div>
			<div className="font-medium">
				<h3>{orderItem.product.name}</h3>
				<p className="mt-1 text-sm text-gray-600">{orderItem.product.categories[0]?.name}</p>
				<p className="mt-1 text-sm text-gray-600">{orderItem.size}</p>
			</div>
			<div className="ml-auto flex items-center gap-4">
				<ChangeQuantity
					price={orderItem.product.price}
					quantity={orderItem.quantity}
					itemId={orderItem.id}
				/>
				<RemoveButton itemId={orderItem.id} />
				<p>{formatMoney(orderItem.product?.price / 100)}</p>
			</div>
		</li>
	);
}
