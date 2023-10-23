import { redirect } from "next/navigation";
import { ChangeQuantity } from "./ChangeQuantity";
import { getCartFromCookies } from "@/service/cart.service";
import { formatMoney } from "@/utils";
import { ProductImage } from "@/components/atoms/ProductImage";
import { RemoveButton } from "@/app/cart/RemoveButton";
import { handlePaymentAction } from "@/app/cart/actions";

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
		<section className="mx-auto flex w-full max-w-3xl flex-col">
			<ul>
				{cart.orderItems.map(
					(item) =>
						item.product && (
							<li className="my-2 flex items-center gap-6" key={item.id}>
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

			<div className="flex items-center justify-between font-medium">
				<span className="px-3 py-2">Total: {formatMoney(total / 100)}</span>
				<form action={handlePaymentAction}>
					<button
						type="submit"
						className="rounded-md border border-transparent bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
					>
						Pay
					</button>
				</form>
			</div>
		</section>
	);
}
