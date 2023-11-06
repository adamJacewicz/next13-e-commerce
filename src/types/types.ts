import type dynamicIconImports from "lucide-react/dynamicIconImports";
import type { Route } from "next";
import { type ProductOrderByInput, type ProductVariantsFragment } from "@/gql/graphql";

export type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export type ArrElement<T> = T extends (infer U)[] ? U : never;

export type ProductVariant = ArrElement<ProductVariantsFragment["variants"]>;

export type IconName = keyof typeof dynamicIconImports;

export type NavLink = { exact?: boolean; label: string; href: Route };

export type Review = {
	createdAt?: unknown;
	rating?: number | null | undefined;
	id?: string;
	email: string;
	name: string;
	headline: string;
	content: string;
};

export type OrderType = {
	label: string;
	value: ProductOrderByInput;
	type: "name" | "price" | "rating";
};
