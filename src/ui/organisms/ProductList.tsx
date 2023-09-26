import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { type ProductItemType } from "@/types";

type ProductListProps = {
	products: ProductItemType[];
};

export function ProductList({ products }: ProductListProps) {
	return (
		<ul
			data-testid="products-list"
			className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{products.map((product) => (
				<li key={product.id}>
					<ProductListItem product={product} />
				</li>
			))}
		</ul>
	);
}
