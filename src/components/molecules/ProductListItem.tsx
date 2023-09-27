import Link from "next/link";
import { ProductCoverImage } from "@/components/atoms/ProductCoverImage";
import { ProductListItemHead } from "@/components/atoms/ProductListItemHead";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<Link className="p-3" href={`/product/${product.id}`}>
			<article>
				<ProductCoverImage src={product.images[0].url} alt={product.name} />
				<ProductListItemHead product={product} />
			</article>
		</Link>
	);
};
