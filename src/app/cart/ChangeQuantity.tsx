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
				className="rounded-sm border bg-slate-300 p-0.5 disabled:bg-opacity-50 disabled:text-opacity-50"
				formAction={async () => {
					if (optimisticQuantity - 1 <= 0) return;
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
				}}
			>
				<Minus width={18} height={18} />
			</button>
			<span className="w-8 text-center">{optimisticQuantity}</span>
			<button
				type="submit"
				className="rounded-sm border bg-slate-300 p-0.5 disabled:bg-opacity-50 disabled:text-opacity-50"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				<Plus width={18} height={18} />
			</button>
		</form>
	);
}
