import { executeGraphql } from "@/utils";
import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetListBySearchQueryDocument,
	ProductsGetListDocument,
	type ProductsGetListQueryVariables,
	ProductsGetRecommendationListDocument,
} from "@/gql/graphql";
import { PRODUCTS_PER_PAGE } from "@/constants";

export async function getProductList(options?: { page: number; perPage?: number }) {
	if (!options) {
		const {
			productsConnection: {
				aggregate: { count },
				products,
				pageInfo,
			},
		} = await executeGraphql({
			query: ProductsGetListDocument,
			variables: {},
			next: {
				revalidate: 60 * 60 * 24,
			},
		});
		return { products: products.map(({ node }) => node), count, pageInfo };
	}

	const perPage = options?.perPage ?? PRODUCTS_PER_PAGE;

	const variables: ProductsGetListQueryVariables = {
		skip: (options.page - 1) * perPage,
		first: perPage,
	};

	const {
		productsConnection: {
			aggregate: { count },
			products,
			pageInfo,
		},
	} = await executeGraphql({
		variables,
		query: ProductsGetListDocument,
		next: {
			revalidate: 60 * 60 * 24,
		},
	});

	return { products: products.map(({ node }) => node), count, pageInfo };
}

export async function getProductById(id: string) {
	const { product } = await executeGraphql({
		variables: { id },
		query: ProductGetByIdDocument,
		next: {
			revalidate: 60 * 60 * 24,
		},
	});
	return product;
}

export async function getProductsListByCategory({
	slug,
	page,
	perPage = PRODUCTS_PER_PAGE,
}: {
	slug: string;
	page: number;
	perPage?: number;
}) {
	const {
		productsConnection: {
			products,
			pageInfo,
			aggregate: { count },
		},
	} = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			skip: (page - 1) * perPage,
			first: perPage,
			slug,
		},
		next: {
			revalidate: 60 * 60 * 24,
		},
	});

	return { products: products.map(({ node }) => node), count, pageInfo };
}

export async function getProductsListByCollection({
	slug,
	page,
	perPage = PRODUCTS_PER_PAGE,
}: {
	slug: string;
	page: number;
	perPage?: number;
}) {
	const {
		productsConnection: {
			products,
			pageInfo,
			aggregate: { count },
		},
	} = await executeGraphql({
		variables: {
			skip: (page - 1) * perPage,
			first: perPage,
			slug,
		},
		query: ProductsGetByCollectionSlugDocument,
		next: {
			revalidate: 60 * 60 * 24,
		},
	});

	return { products: products.map(({ node }) => node), count, pageInfo };
}

// const wait = async (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export async function getRecommendationProducts() {
	// await wait(2000);
	const { products } = await executeGraphql({
		query: ProductsGetRecommendationListDocument,
		next: {
			revalidate: 60 * 60 * 24,
		},
	});

	return products;
}

export async function getProductsBySearchQuery(query: string) {
	const { products } = await executeGraphql({
		variables: {
			query,
		},
		next: {
			revalidate: 60 * 60 * 24,
		},
		query: ProductsGetListBySearchQueryDocument,
	});

	return products;
}
