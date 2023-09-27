import type { ProductListItemFragment } from "@/gql/graphql";

export const ProductListItemDescription = ({
	product: { description },
}: {
	product: ProductListItemFragment;
}) => {
	return (
		<>
			<span className="sr-only">Description</span>
			<div className="prose text-gray-700 sm:text-lg">{description}</div>
		</>
	);
};
