"use server";

import { revalidatePath } from "next/cache";
import { type Review } from "@/types/types";
import { average, executeGraphql } from "@/utils";
import { ProductUpdateAverageRatingDocument, ReviewAddToProductDocument } from "@/gql/graphql";

export async function addReviewAction({
	review,
	productId,
}: {
	review: Review;
	productId: string;
}) {
	const response = await executeGraphql({
		query: ReviewAddToProductDocument,
		variables: {
			review: {
				...review,
				product: {
					connect: { id: productId },
				},
			},
			productId,
		},
	});
	if (response.createReview) {
		await executeGraphql({
			query: ProductUpdateAverageRatingDocument,
			variables: {
				productId,
				averageRating: parseFloat(
					average(
						response.createReview.product?.reviews.map(({ rating }) => rating ?? 0) ?? [],
					).toFixed(1),
				),
			},
		});
		revalidatePath(`/product/${productId}`);
	}
	return response;
}
