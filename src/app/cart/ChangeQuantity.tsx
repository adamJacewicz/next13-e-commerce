"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { Plus, Minus } from "lucide-react";
import { changeItemQuantity } from "./actions";

export function ChangeQuantity({ itemId, quantity }: { itemId: string; quantity: number }) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	return (
		<form className="flex items-center">
			<button
				type="submit"
				disabled={optimisticQuantity - 1 <= 0}
				className="h-6 w-6 border text-black disabled:bg-opacity-50 disabled:text-opacity-50"
				formAction={async () => {
					console.log({ optimisticQuantity, quantity });
					if (optimisticQuantity - 1 <= 0) return;
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
				}}
			>
				<Minus />
			</button>
			<span className="w-8 text-center">{optimisticQuantity}</span>
			<button
				type="submit"
				className="h-6 w-6 border"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				<Plus />
			</button>
		</form>
	);
}
