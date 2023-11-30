import type { ProductListItemFragment } from "@/gql/graphql";

export const ProductListItemDescription = ({
	product: { description },
}: {
	product: ProductListItemFragment;
}) => {
	return (
		<>
			<span className="sr-only">Description</span>
			<div className="prose text-base text-gray-700">{description}</div>
		</>
	);
};
