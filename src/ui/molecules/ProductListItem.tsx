import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import type { ProductItemType } from "@/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product: { coverImage, ...product } }: ProductListItemProps) => {
	return (
		<li>
			<article>
				<ProductCoverImage {...coverImage} />
				<ProductListItemDescription {...product} />
			</article>
		</li>
	);
};
