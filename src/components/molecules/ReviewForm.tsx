"use client";
import { useOptimistic, useRef } from "react";
import { SignedIn } from "@clerk/nextjs";
import { InputRating } from "../atoms/InputRating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addReviewAction } from "@/app/product/[slug]/actions";
import { ReviewList } from "@/components/molecules/ReviewList";
import { type Review } from "@/types/types";

export function ReviewForm({ productId, reviews }: { productId: string; reviews: Review[] }) {
	const [optimisticReviews, setOptimisticReviews] = useOptimistic<Array<Review>, Review>(
		reviews,
		(state, review) => [...state, review],
	);
	const formRef = useRef<HTMLFormElement | null>(null);
	const inputRatingRef = useRef<{ reset: () => void } | null>(null);
	async function formAction(data: FormData) {
		const review = {
			name: String(data.get("name")),
			email: String(data.get("email")),
			headline: String(data.get("headline")),
			content: String(data.get("content")),
			rating: Number(data.get("rating")),
		};
		setOptimisticReviews({ ...review, id: crypto.randomUUID() });
		await addReviewAction({
			review,
			productId,
		});
		formRef.current?.reset();
		inputRatingRef.current?.reset();
	}

	return (
		<>
			<SignedIn>
				<div className="flex gap-8">
					<form
						ref={formRef}
						action={formAction}
						data-testid="add-review-form"
						className="flex w-1/3 flex-col gap-y-4 text-xs"
					>
						<Label>
							<span className="mb-1 block text-xs">Name</span>
							<Input name="name" required />
						</Label>
						<Label>
							<span className="mb-1 block text-xs">Email</span>
							<Input type="email" name="email" required />
						</Label>
						<Label>
							<span className="mb-1 block text-xs">Title</span>
							<Input name="headline" required />
						</Label>
						<Label>
							<span className="mb-1 block text-xs">Review</span>
							<Textarea className="max-h-[150px]" name="content" required />
						</Label>
						<div>
							<span className="mb-1 block text-xs">Rate</span>
							<InputRating ref={inputRatingRef} />
						</div>

						<Button type="submit">Submit</Button>
					</form>
				</div>
			</SignedIn>
			<ReviewList reviews={optimisticReviews} />
		</>
	);
}
