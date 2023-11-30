"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { removeItem } from "@/app/cart/actions";
import { Button } from "@/components/ui/button";

export function RemoveButton({ itemId }: { itemId: string }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<Button
			size="icon"
			variant="destructive"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
		>
			<Trash width={16} height={16} />
		</Button>
	);
}
