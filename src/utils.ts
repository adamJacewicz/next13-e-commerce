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

export async function executeGraphql<TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}
	const response = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query: query.toString(),
			variables,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const graphqlResponse = (await response.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
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
