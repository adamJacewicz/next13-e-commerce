import React from "react";
import Image from "next/image";
import { type CartFragment } from "@/gql/graphql";
import { ChangeQuantity } from "@/app/cart/ChangeQuantity";
import { RemoveButton } from "@/app/cart/RemoveButton";
import { formatMoney } from "@/lib/utils";
import { type ArrElement } from "@/types/types";

export function CartProduct({ item }: { item: ArrElement<CartFragment["orderItems"]> }) {
	if (!item.product) return null;
	return (
		<li className="flex gap-4 py-6">
			<div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200">
				<Image src={item.product.images[0].url} alt={item.product.name} width="64" height="64" />
			</div>
			<div>
				<h3 className="font-medium text-slate-900">{item.product.name}</h3>
				<p className="mt-1 text-sm font-medium text-slate-500">
					{item.product.categories[0]?.name}
				</p>
				<p className="mt-1 text-sm font-medium text-slate-500">{item.size}</p>
			</div>
			<div className="ml-auto flex items-center gap-4">
				<ChangeQuantity price={item.product.price} quantity={item.quantity} itemId={item.id} />
				<RemoveButton itemId={item.id} />
				<p className="ml-4">{formatMoney(item.product?.price / 100)}</p>
			</div>
		</li>
	);
}
