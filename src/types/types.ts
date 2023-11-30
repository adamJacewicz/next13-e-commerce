import type dynamicIconImports from "lucide-react/dynamicIconImports";
import type { Route } from "next";
import { type ProductOrderByInput, type ProductSize as Size } from "@/gql/graphql";

export type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export type ArrElement<T> = T extends (infer U)[] ? U : never;

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
export type ProductSize = Pick<Size, "quantity" | "value" | "name" | "id">;
// export type Variant<
// 	T extends "ProductSizeVariant" | "ProductColorVariant" =
// 		| "ProductSizeVariant"
// 		| "ProductColorVariant",
// > = {
// 	__typename: T;
// 	id: string;
// 	name: string;
// 	size?: Variant<T>["__typename"] extends "ProductSizeVariant" ? ProductSize : undefined;
// 	color?: Variant<T>["__typename"] extends "ProductColorVariant" ? { css: string } : undefined;
// };
