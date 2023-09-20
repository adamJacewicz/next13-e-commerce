import { twMerge } from "tailwind-merge";
import Star from "@/public/star.svg";

type ProductRaringProps = {
	rating: number;
};

export function ProductRating({ rating }: ProductRaringProps) {
	const stars = Math.floor(rating);
	return (
		<div className="flex items-center gap-1">
			<span className="sr-only">Reviews</span>
			<div className="flex items-center">
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<Star key={i} className={twMerge(i < stars ? "text-yellow-500" : "text-gray-400")} />
					))}
			</div>
			<p className="text-sm">
				({rating})<span className="sr-only"> out of 5 stars</span>
			</p>
		</div>
	);
}