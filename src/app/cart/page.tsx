import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/service/cart.service";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { handlePaymentAction } from "@/app/cart/actions";
import { CartProduct } from "@/components/molecules/CartProduct";
import { EmptyCartPage } from "@/components/molecules/EmptyCartPage";

export default async function CartPage() {
	const cart = await getCartFromCookies();
	if (!cart) {
		redirect("/");
	}
	if (!cart.orderItems.length) return <EmptyCartPage />;

	const total = cart.orderItems.reduce(
		(acc, item) => acc + item.quantity * (item.product?.price ?? 0),
		0,
	);
	return (
		<section className="mx-auto w-full max-w-3xl rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
			<ul>
				{cart.orderItems.map((item) => (
					<CartProduct item={item} key={item.id} />
				))}
			</ul>

			<div className="flex items-center justify-between font-medium">
				<span>Total: {formatMoney(total / 100)}</span>
				<form action={handlePaymentAction}>
					<Button type="submit">Pay</Button>
				</form>
			</div>
		</section>
	);
}
