import { Star } from "lucide-react";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

const activeClass = "fill-amber-400 stroke-amber-400";
const inactiveClass = "fill-slate-400 stroke-slate-400";

type RatingStarProps = ComponentPropsWithRef<"svg"> & {
	filled?: boolean;
};

export function RatingStar({ filled = true, className, ...rest }: RatingStarProps) {
	return (
		<Star {...rest} className={cn("h-4 w-4", filled ? activeClass : inactiveClass, className)} />
	);
}
