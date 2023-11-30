import Link from "next/link";
import { ProductImage } from "@/components/atoms/ProductImage";
import { ProductListItemHead } from "@/components/atoms/ProductListItemHead";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<Link className="p-3" href={`/product/${product.slug}`}>
			<article>
				<ProductImage src={product.images[0]?.url} alt={product.name} />
				<ProductListItemHead product={product} />
			</article>
		</Link>
	);
};
