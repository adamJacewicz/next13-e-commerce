import { executeGraphql } from "@/lib/utils";
import { CategoriesGetByCategorySlugDocument, CategoriesGetListDocument } from "@/gql/graphql";

export async function getCategoryBySlug(slug: string) {
	const { categories } = await executeGraphql({
		variables: { slug },
		query: CategoriesGetByCategorySlugDocument,
	});

	return categories[0];
}

export async function getCategoryList() {
	const { categories } = await executeGraphql({ query: CategoriesGetListDocument });

	return categories;
}
