import type { ProductItemType } from "@/types";
import { formatMoney } from "@/app/utils";

export const ProductListItemHead = ({
	product: { name, category, price },
}: {
	product: ProductItemType;
}) => {
	return (
		<div className="flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-100">{name}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-300">
					<span className="sr-only">Kategoria:</span> {category}
				</p>
			</div>
			<p className="text-sm font-medium text-gray-900 dark:text-gray-50">
				<span className="sr-only">Cena:</span> {formatMoney(price / 100)}
			</p>
		</div>
	);
};
