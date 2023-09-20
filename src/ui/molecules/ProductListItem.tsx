import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemHead } from "@/ui/atoms/ProductListItemHead";
import type { ProductItemType } from "@/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<Link href={`/product/${product.id}`}>
			<article className="flex flex-col gap-2">
				<ProductListItemHead product={product} />
				<ProductCoverImage {...product.coverImage} />
			</article>
		</Link>
	);
};
