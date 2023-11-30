import Link from "next/link";

export function EmptyCartPage() {
	return (
		<div className="flex h-64 flex-col items-center justify-center p-6">
			<h2 className="mb-2 text-xl font-semibold">Your Shopping Cart is empty</h2>
			<p className="text-zinc-500 dark:text-zinc-400">
				Looks like you haven’t added any items to the cart yet.
			</p>
			<Link
				href={`/products`}
				className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				Explore products
			</Link>
		</div>
	);
}
