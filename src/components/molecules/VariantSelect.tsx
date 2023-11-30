import type { Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { cn } from "@/lib/utils";
import { type ProductSize } from "@/types/types";

type VariantSelectProps = {
	variants: Array<ProductSize & { url: Route }>;
	name: string;
};

export function VariantSelect({ variants, name }: VariantSelectProps) {
	if (!variants.length) return null;
	return (
		<fieldset role="radiogroup">
			<legend className="sr-only">{name}</legend>
			<div className="flex flex-wrap gap-3">
				{variants.map((variant) => {
					return (
						<ActiveLink
							key={variant.id}
							activeClassName="bg-primary text-primary-foreground shadow hover:bg-primary/90"
							className={cn(
								"inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input border-slate-300 bg-transparent px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
								!variant.quantity && "pointer-events-none opacity-50",
							)}
							prefetch={true}
							scroll={false}
							href={variant.url}
							role="radio"
						>
							{variant.name}
						</ActiveLink>
					);
				})}
			</div>
		</fieldset>
	);
}
