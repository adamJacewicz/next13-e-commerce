import type dynamicIconImports from "lucide-react/dynamicIconImports";
import { type ProductVariantsFragment } from "@/gql/graphql";

export type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export type ArrElement<T> = T extends (infer U)[] ? U : never;

export type ProductVariant = ArrElement<ProductVariantsFragment["variants"]>;

export type IconName = keyof typeof dynamicIconImports;
