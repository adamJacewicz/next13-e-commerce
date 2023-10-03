import { getProductsBySearchQuery } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";

type SearchPageProps = {
	searchParams: {
		query: string;
	};
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const query = searchParams.query ?? "";
	const products = await getProductsBySearchQuery(query);
	return (
		<div>
			{products.length === 0 ? (
				<p className="text-center">No products found</p>
			) : (
				<ProductList products={products} />
			)}
		</div>
	);
}
