"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function AddToCartButton() {
	const formStatus = useFormStatus();

	return (
		<button
			disabled={formStatus.pending}
			type="submit"
			className="w-full rounded-md border border-transparent bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
		>
			Add to cart
		</button>
	);
}
