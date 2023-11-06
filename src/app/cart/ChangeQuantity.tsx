"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { Plus, Minus } from "lucide-react";
import { changeItemQuantity } from "./actions";

export function ChangeQuantity({ itemId, quantity }: { itemId: string; quantity: number }) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	async function setQuantity(value: number) {
		if (value <= 0) return;
		setOptimisticQuantity(value);
		await changeItemQuantity(itemId, value);
	}

	return (
		<form className="flex items-center">
			<button
				data-testid="decrement"
				type="submit"
				disabled={optimisticQuantity - 1 <= 0}
				className="rounded-sm border bg-slate-300 p-0.5 disabled:bg-opacity-50 disabled:text-opacity-50"
				formAction={() => setQuantity(optimisticQuantity - 1)}
			>
				<Minus width={18} height={18} />
			</button>
			<span className="w-8 text-center" data-testid="quantity">
				{optimisticQuantity}
			</span>
			<button
				data-testid="increment"
				type="submit"
				className="rounded-sm border bg-slate-300 p-0.5 disabled:bg-opacity-50 disabled:text-opacity-50"
				formAction={() => setQuantity(optimisticQuantity + 1)}
			>
				<Plus width={18} height={18} />
			</button>
		</form>
	);
}
