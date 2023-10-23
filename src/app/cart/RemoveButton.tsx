"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { removeItem } from "@/app/cart/actions";

export function RemoveButton({ itemId }: { itemId: string }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<button
			disabled={isPending}
			className="rounded-md border border-transparent bg-blue-600 p-1 font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
			onClick={() => {
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
		>
			<X width={18} height={18} />
		</button>
	);
}
