import { ProductRecommendationList } from "@/components/molecules/ProductRecommendationList";
import { CollectionList } from "@/components/molecules/CollectionList";

export default async function Home() {
	return (
		<div className="flex flex-col gap-10">
			<h1 className="mx-auto mb-6 whitespace-nowrap text-center text-2xl font-bold sm:text-xl md:text-3xl">
				Home
			</h1>
			<CollectionList />
			<ProductRecommendationList />
		</div>
	);
}
