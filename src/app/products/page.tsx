import { ProductList } from "@/ui/organisms/ProductList";
import type { ProductItemType } from "@/types";

const products: ProductItemType[] = [
	{
		id: 0,
		category: "Accessories",
		name: "Kubek",
		price: 2137,
		coverImage: {
			alt: "Kubek",
			src: "cup.jpg",
		},
	},
	{
		id: 1,
		category: "Accessories",
		name: "Okulary",
		price: 1337,
		coverImage: {
			alt: "Okulary",
			src: "sunglasses.jpg",
		},
	},
	{
		id: 2,
		category: "Accessories",
		name: "Zegarek",
		price: 1337,
		coverImage: {
			alt: "Zegarek",
			src: "watch.jpg",
		},
	},
	{
		id: 3,
		category: "Accessories",
		name: "Kwiat",
		price: 1337,
		coverImage: {
			alt: "Kwiat",
			src: "flower.jpg",
		},
	},
];

export default function Products() {
	return <ProductList products={products} />;
}
