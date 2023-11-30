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
		<section className="mx-auto w-full max-w-3xl">
			<ul>
				{cart.orderItems.map((item) => (
					<CartProduct orderItem={item} key={item.id} />
				))}
			</ul>
			<div className="mt-12">
				<div className="rounded border bg-neutral-50 px-4 py-2">
					<div className="flex items-center justify-between gap-2 py-2">
						<div>
							<p className="font-semibold text-neutral-900">Your Total</p>
							<p className="mt-1 text-sm text-neutral-500">
								Shipping will be calculated in the next step
							</p>
						</div>
						<div className="font-medium text-neutral-900">{formatMoney(total / 100)}</div>
					</div>
				</div>
				<form className="mt-10 text-center" action={handlePaymentAction}>
					<Button className="aria-disabled:cursor-not-allowed sm:w-1/3 sm:px-16" type="submit">
						Checkout
					</Button>
				</form>
			</div>
		</section>
	);
}
