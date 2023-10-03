import { getProductList } from "@/service/product.service";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { ProductList } from "@/components/molecules/ProductList";
import { Pagination } from "@/components/molecules/Pagination";

type ProductsPageParams = {
	page: string;
};

export async function generateStaticParams() {
	// const { count } = await getProductList({ page: 1, perPage: 14 });
	return [
		{
			page: "1",
		},
		{
			page: "2",
		},
		{
			page: "3",
		},
		{
			page: "4",
		},
		{
			page: "5",
		},
		{
			page: "6",
		},
		{
			page: "7",
		},
		{
			page: "8",
		},
		{
			page: "9",
		},
		{
			page: "10",
		},
		{
			page: "11",
		},
		{
			page: "12",
		},
		{
			page: "13",
		},
		{
			page: "14",
		},
	];

	return Array.from({ length: 14 }, (_, i) => ({
		page: `${i + 1}`,
	}));
}
export default async function ProductsPage({ params }: { params: ProductsPageParams }) {
	console.log(123, params);

	const page = Number(params.page);
	const { products, count } = await getProductList({
		page: page,
		perPage: PRODUCTS_PER_PAGE,
	});
	return (
		<div className="flex flex-col">
			<ProductList products={products} />
			<Pagination page={page} total={count} />
		</div>
	);
}
