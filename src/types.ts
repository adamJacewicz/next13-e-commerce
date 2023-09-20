export type ProductRating = {
	rate: number;
	count: number;
};

export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	description: string;
	longDescription: string;
	price: number;
	rating: ProductRating;
	coverImage: { src: string; alt: string };
};

export type ProductItemResponse = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: ProductRating;
	image: string;
	longDescription: string;
};
