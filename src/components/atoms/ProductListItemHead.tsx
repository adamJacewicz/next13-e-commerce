import { formatMoney } from "@/utils";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemHeadProps = {
	product: ProductListItemFragment;
};

export const ProductListItemHead = ({
	product: { name, price, categories },
}: ProductListItemHeadProps) => {
	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-2 font-medium text-gray-700 sm:text-lg">
				<h3>{name}</h3>
				<p>{formatMoney(price / 100)}</p>
			</div>
			<div className="mt-1 flex items-center gap-2 text-gray-500 sm:text-base">
				{categories.map(({ id, name }) => (
					<span key={id}>{name}</span>
				))}
			</div>
		</div>
	);
};
