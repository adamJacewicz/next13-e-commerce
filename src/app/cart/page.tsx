import { redirect } from "next/navigation";
import { ChangeQuantity } from "./ChangeQuantity";
import { getCartFromCookies } from "@/service/cart.service";
import { formatMoney } from "@/utils";
import { ProductImage } from "@/components/atoms/ProductImage";
import { RemoveButton } from "@/app/cart/RemoveButton";

export default async function CartPage() {
	const cart = await getCartFromCookies();
	if (!cart) {
		redirect("/");
	}
	const total = cart.orderItems.reduce(
		(acc, item) => acc + item.quantity * (item.product?.price ?? 0),
		0,
	);
	return (
		<section className="w-full">
			<ul>
				{cart.orderItems.map(
					(item) =>
						item.product && (
							<li className="my-4 flex items-center gap-10" key={item.id}>
								<ProductImage
									width={100}
									height={100}
									alt={item.product.name}
									src={item.product.images[0].url}
								/>
								<span className="flex-1">{item.product.name}</span>
								<ChangeQuantity quantity={item.quantity} itemId={item.id} />
								<RemoveButton itemId={item.id} />
								<span>{formatMoney(item.product.price / 100)}</span>
							</li>
						),
				)}
			</ul>
			<div>total: {total}</div>
		</section>
	);
}
