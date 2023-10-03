import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListProps = {
	products: ProductListItemFragment[];
};

export function ProductList({ products }: ProductListProps) {
	return (
		<ul
			data-testid="products-list"
			className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-12"
		>
			{products.map((product) => (
				<li key={product.id}>
					<ProductListItem product={product} />
				</li>
			))}
		</ul>
	);
}
