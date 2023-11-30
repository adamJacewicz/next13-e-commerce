import { type Variant } from "@/types/types";
import { type ColorVariantFragment, type SizeVariantFragment } from "@/gql/graphql";

export function isColorVariant(variant: Variant): variant is ColorVariantFragment {
	return variant.__typename === "ProductColorVariant";
}

export function isSizeVariant(variant: Variant): variant is SizeVariantFragment {
	return variant.__typename === "ProductSizeVariant";
}
