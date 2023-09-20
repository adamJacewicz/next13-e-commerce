import type { ProductItemType } from "@/types";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type ProductListProps = {
	products: ProductItemType[];
};

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<ul
			data-testid="products-list"
			className="gap grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{products.map((product) => (
				<li key={product.id}>
					<ProductListItem product={product} />
				</li>
			))}
		</ul>
	);
};
