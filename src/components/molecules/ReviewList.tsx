"use client";
import { useOptimistic } from "react";
import { useUser } from "@clerk/nextjs";
import { Rating } from "@/components/molecules/Rating";
import { type Review } from "@/types/types";
import { addReviewAction } from "@/app/product/[slug]/actions";
import { ReviewForm } from "@/components/molecules/ReviewForm";

type ReviewListProps = { productId: string; reviews: Review[] };

export function ReviewList({ reviews, productId }: ReviewListProps) {
	const { user } = useUser();
	const [optimisticReviews, setOptimisticReviews] = useOptimistic<Array<Review>, Review>(
		reviews,
		(state, review) => [...state, review],
	);
	async function formAction(data: FormData) {
		const email = user?.emailAddresses?.find((email) => email.id === user?.primaryEmailAddressId)
			?.emailAddress;
		if (!email) return;
		const review = {
			name: String(data.get("name")),
			email,
			headline: String(data.get("headline")),
			content: String(data.get("content")),
			rating: Number(data.get("rating")),
		};
		setOptimisticReviews({ ...review, id: crypto.randomUUID() });
		await addReviewAction({
			review,
			productId,
		});
	}
	return (
		<section className="flex">
			<ul className="w-2/3">
				{optimisticReviews.map((review) => (
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
			<ReviewForm formAction={formAction} />
		</section>
	);
}
