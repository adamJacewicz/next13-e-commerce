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
			products,
			productsConnection: {
				aggregate: { count },
			},
		} = await executeGraphql(ProductsGetListDocument, {});
		return { products, count };
	}

	const perPage = options?.perPage ?? PRODUCTS_PER_PAGE;

	const variables: ProductsGetListQueryVariables = {
		skip: (options.page - 1) * perPage,
		first: perPage,
	};

	const {
		products,
		productsConnection: {
			aggregate: { count },
		},
	} = await executeGraphql(ProductsGetListDocument, variables);

	return { products, count };
}

export async function getProductById(id: string) {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id });
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
		products,
		productsConnection: {
			aggregate: { count },
		},
	} = await executeGraphql(ProductsGetByCategorySlugDocument, {
		skip: (page - 1) * perPage,
		first: perPage,
		slug,
	});

	return { products, count };
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
		products,
		productsConnection: {
			aggregate: { count },
		},
	} = await executeGraphql(ProductsGetByCollectionSlugDocument, {
		skip: (page - 1) * perPage,
		first: perPage,
		slug,
	});

	return { products, count };
}

// const wait = async (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export async function getRecommendationProducts() {
	// await wait(2000);
	const { products } = await executeGraphql(ProductsGetRecommendationListDocument);

	return products;
}
export async function getProductsBySearchQuery(query: string) {
	const { products } = await executeGraphql(ProductsGetListBySearchQueryDocument, {
		query,
	});

	return products;
}
