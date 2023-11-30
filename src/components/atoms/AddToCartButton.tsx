"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
	disabled: boolean;
};

export function AddToCartButton({ disabled }: AddToCartButtonProps) {
	const formStatus = useFormStatus();

	return (
		<Button
			className="px-6"
			disabled={disabled || formStatus.pending}
			type="submit"
			data-testid="add-to-cart-button"
		>
			Add to cart
		</Button>
	);
}
