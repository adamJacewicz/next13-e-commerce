import { RatingStar } from "@/components/atoms/RatingStar";

type RatingProps = {
	rating: number;
};

const stars = Array.from({ length: 5 }, (_, i) => i);

export function Rating({ rating }: RatingProps) {
	return (
		<div className="flex items-center gap-2">
			<div className="text-xs">
				<span data-testid="product-rating">{rating}</span>/5
			</div>
			<div className="flex items-center">
				{stars.map((rate) => (
					<RatingStar key={rate} filled={rate < Math.floor(rating)} />
				))}
			</div>
		</div>
	);
}
