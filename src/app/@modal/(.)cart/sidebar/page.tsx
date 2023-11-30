import { Overlay } from "@/components/atoms/Overlay";
import { formatMoney } from "@/lib/utils";
import { getCartFromCookies } from "@/service/cart.service";
import { CartProduct } from "@/components/molecules/CartProduct";

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
									<CartProduct key={item.id} item={item} />
								))}
							</ul>
						</div>
					)}
				</div>
				<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
					<div className="flex justify-between text-base font-medium text-slate-900">
						<p>Total</p>
						<p className="small-caps">{formatMoney(total / 100)}</p>
					</div>
					<p className="mt-0.5 text-sm text-slate-500">
						Shipping and taxes will be added at the next step
					</p>
					<form className="mt-6">
						<button
							type="submit"
							className="w-full rounded border border-transparent bg-blue-500 px-6 py-3 font-medium text-slate-50 hover:bg-blue-600 disabled:bg-gray-300"
						>
							Checkout
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
