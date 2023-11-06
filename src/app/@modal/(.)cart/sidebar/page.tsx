import Image from "next/image";
import { Overlay } from "@/components/atoms/Overlay";

import { formatMoney } from "@/utils";
import { getCartFromCookies } from "@/service/cart.service";

export default async function ModalCart() {
	const cart = await getCartFromCookies();
	if (!cart?.orderItems) return null;
	const total = cart.orderItems.reduce(
		(acc, item) => acc + item.quantity * (item.product?.price ?? 0),
		0,
	);

	return (
		<>
			<Overlay />
			<div className="animation-slide-from-right absolute bottom-0 right-0 top-0 z-30 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
					<h3 className="text-lg font-medium text-slate-900">Shopping cart</h3>
					<div className="mt-8">
						{cart?.orderItems.length > 0 && (
							<ul role="list" className="-my-6 divide-y divide-gray-200">
								{cart.orderItems.map((item, index) => {
									if (item.quantity < 1) return null;
									return (
										<li key={`${item.id}-${index}`} className="flex py-6">
											<div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200">
												{item.product?.images[0] && (
													<Image
														src={item.product?.images[0].url}
														alt={item.product?.name}
														width="64"
														height="64"
													/>
												)}
											</div>
											<div className="ml-4 flex flex-1 flex-col">
												<div className="flex justify-between text-base font-medium text-slate-900">
													<h3>{item.product?.name}</h3>
													{item.product?.price && (
														<p className="small-caps ml-4">
															{formatMoney(item.product?.price / 100)}
														</p>
													)}
												</div>
												{item.product && (
													<p className="mt-1 text-sm text-slate-500">
														{item.product.categories[0]?.name}
													</p>
												)}
												<div className="flex flex-1 items-end justify-between text-sm font-bold text-slate-500">
													Quantity:{item.quantity}
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						)}
					</div>
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
