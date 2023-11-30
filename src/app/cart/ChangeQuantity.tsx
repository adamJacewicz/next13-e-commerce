"use client";
import { useOptimistic } from "react";
import { Plus, Minus } from "lucide-react";
import { changeItemQuantity } from "./actions";
import { Button } from "@/components/ui/button";

export function ChangeQuantity({
	itemId,
	quantity,
	price,
}: {
	itemId: string;
	quantity: number;
	price: number;
}) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	async function setQuantity(value: number) {
		if (value <= 0) return;
		setOptimisticQuantity(value);
		await changeItemQuantity({ itemId, quantity: value, total: value * price });
	}

	return (
		<form className="flex items-center gap-2">
			<Button
				variant="outline"
				data-testid="decrement"
				size="icon"
				type="submit"
				disabled={optimisticQuantity - 1 <= 0}
				formAction={() => setQuantity(optimisticQuantity - 1)}
			>
				<Minus width={18} height={18} />
			</Button>
			<span className="text-center" data-testid="quantity">
				{optimisticQuantity}
			</span>
			<Button
				variant="outline"
				size="icon"
				data-testid="increment"
				type="submit"
				formAction={() => setQuantity(optimisticQuantity + 1)}
			>
				<Plus width={18} height={18} />
			</Button>
		</form>
	);
}
