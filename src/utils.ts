import type { GraphQLResponse, ProductVariant } from "@/types/types";
import {
	type ProductColorVariant,
	type ProductSizeVariant,
	type TypedDocumentString,
} from "@/gql/graphql";

export function formatMoney(value: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
}

export function average(nums: number[]) {
	return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

export async function executeGraphql<TResult, TVariables>({
	query,
	variables,
	headers,
	next,
	cache,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}
	if (!process.env.GRAPHQL_TOKEN) {
		throw TypeError("GRAPHQL_TOKEN is not defined");
	}
	const response = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			...headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
		},
		cache,
		next,
	});

	const graphqlResponse = (await response.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		console.log(graphqlResponse.errors);
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
}

function isColorVariant(
	variant: ProductVariant,
): variant is Pick<ProductColorVariant, "id" | "color" | "name"> {
	return "color" in variant;
}

function isSizeVariant(
	variant: ProductVariant,
): variant is Pick<ProductSizeVariant, "id" | "size" | "name"> {
	return "size" in variant;
}

export function productVariantToSelectOption(variant: ProductVariant) {
	let value;
	if (isSizeVariant(variant) && isColorVariant(variant)) {
		value = `${variant.size}/${variant.color}`;
	} else if (isSizeVariant(variant)) {
		value = variant.size;
	} else {
		value = variant.color;
	}

	return {
		label: variant.name,
		id: variant.id,
		value,
	};
}
