import type { ProductItemType } from "@/types";

export const ProductListItemDescription = ({
	product: { description },
}: {
	product: ProductItemType;
}) => {
	return (
		<>
			<span className="sr-only">Description</span>
			<div className="prose prose-sm text-gray-700 dark:text-gray-100">{description}</div>
		</>
	);
};
