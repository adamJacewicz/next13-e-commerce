import { Overlay } from "@/components/atoms/Overlay";
import { formatMoney } from "@/lib/utils";
import { getCartFromCookies } from "@/service/cart.service";
import { CartProduct } from "@/components/molecules/CartProduct";
import { Button } from "@/components/ui/button";

export default async function ModalCart() {
	const cart = await getCartFromCookies();
	const total =
		cart?.orderItems.reduce((acc, item) => acc + item.quantity * (item.product?.price ?? 0), 0) ??
		0;
	if (!cart?.orderItems) return null;

	return (
		<>
			<Overlay />
			<div className="animation-slide-from-right absolute bottom-0 right-0 top-0 z-30 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
					<h3 className="text-lg font-medium text-slate-900">Shopping cart</h3>
					{cart?.orderItems.length > 0 && (
						<div className="mt-8">
							<ul role="list" className="-my-6 divide-y divide-gray-200">
								{cart.orderItems.map((item) => (
									<CartProduct key={item.id} orderItem={item} />
								))}
							</ul>
						</div>
					)}
				</div>
				<div className="border-t border-gray-200 bg-neutral-50 px-4 py-6 sm:px-6">
					<div className="flex items-center justify-between gap-2 py-2">
						<div>
							<p className="font-semibold text-neutral-900">Your Total</p>
							<p className="mt-1 text-sm text-neutral-500">
								Shipping will be calculated in the next step
							</p>
						</div>
						<div className="font-medium text-neutral-900">{formatMoney(total / 100)}</div>
					</div>
					<form className="mt-6">
						<Button type="submit" className="w-full">
							Checkout
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
