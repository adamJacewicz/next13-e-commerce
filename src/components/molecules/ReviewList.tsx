import { Rating } from "@/components/molecules/Rating";
import { type Review } from "@/types/types";

type ReviewListProps = {
	reviews: Review[];
};

export function ReviewList({ reviews }: ReviewListProps) {
	return (
		<ul className="w-2/3">
			{reviews.map((review) => (
				<li className="mb-8 flex gap-4 text-sm" key={review.id}>
					<div className="flex flex-col gap-2">
						<h4 className="min-w-[100px] font-bold">{review.name}</h4>
						<Rating rating={review.rating as number} />
					</div>
					<div className="flex flex-col gap-2">
						<h4 className="font-bold">{review.headline}</h4>
						<p className="italic">{review.content}</p>
					</div>
				</li>
			))}
		</ul>
	);
}
