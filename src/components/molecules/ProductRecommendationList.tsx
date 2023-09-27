import { getRecommendationProducts } from "@/service/product.service";
import { ProductList } from "@/components/molecules/ProductList";

export async function ProductRecommendationList() {
	const recommendationProducts = await getRecommendationProducts();
	if (!recommendationProducts) return null;
	return (
		<div data-testid="related-products">
			<h2 className="mx-auto mb-6 whitespace-nowrap text-center text-xl font-medium sm:text-xl md:text-2xl">
				Recommendations
			</h2>
			<ProductList products={recommendationProducts} />
		</div>
	);
}
