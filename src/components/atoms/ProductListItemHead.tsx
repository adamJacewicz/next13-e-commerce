import { formatMoney } from "@/utils";
import { type ProductListItemFragment } from "@/gql/graphql";
import { Rating } from "@/components/molecules/Rating";

type ProductListItemHeadProps = {
	product: ProductListItemFragment;
};

export const ProductListItemHead = ({
	product: { name, price, categories, averageRating },
}: ProductListItemHeadProps) => {
	return (
		<div>
			<div className="sm:text-md flex flex-wrap items-center justify-between gap-2 font-medium text-gray-700">
				<h3>{name}</h3>
				<p data-testid="product-price">{formatMoney(price / 100)}</p>
			</div>
			<div className="mt-1 flex items-center justify-between">
				<div className="flex items-center gap-2 text-gray-500 sm:text-sm">
					{categories.map(({ id, name }) => (
						<span key={id}>{name}</span>
					))}
				</div>
				{averageRating && <Rating rating={averageRating} />}
			</div>
		</div>
	);
};
