import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { fetchProducts } from "@/service/product.service";

type ProductListProps = {
	page: number;
};

export async function ProductList({ page }: ProductListProps) {
	const products = await fetchProducts({ perPage: 20, page });

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
}
