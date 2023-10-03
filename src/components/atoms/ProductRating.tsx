import { Star } from "lucide-react";

type ProductRaringProps = {
	rating: number;
};

type RatingStarProps = {
	filled: boolean;
};

function RatingStar({ filled }: RatingStarProps) {
	const color = filled ? "#EAB308" : "#9CA3AF";
	return <Star stroke={color} fill={color} />;
}

export function ProductRating({ rating }: ProductRaringProps) {
	const stars = Math.floor(rating);
	return (
		<div className="flex items-center gap-1">
			<span className="sr-only">Reviews</span>
			<div className="flex items-center">
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<RatingStar key={i} filled={i < stars} />
					))}
			</div>
			<p className="text-sm">({rating})</p>
		</div>
	);
}
