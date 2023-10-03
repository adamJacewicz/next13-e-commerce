import { executeGraphql } from "@/utils";
import { CategoriesGetByCategorySlugDocument } from "@/gql/graphql";

export async function getCategoryBySlug(slug: string) {
	const { categories } = await executeGraphql(CategoriesGetByCategorySlugDocument, { slug });

	return categories[0];
}
