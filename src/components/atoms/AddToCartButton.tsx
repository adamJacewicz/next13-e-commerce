"use client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useFormStatus } from "react-dom";

export function AddToCartButton() {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
	const formStatus = useFormStatus();

	return (
		<button
			disabled={formStatus.pending}
			type="submit"
			data-testid="add-to-cart-button"
			className="w-full rounded-md border border-transparent bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
		>
			Add to cart
		</button>
	);
}
