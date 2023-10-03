import { executeGraphql } from "@/utils";
import { CollectionsGetByCollectionSlugDocument } from "@/gql/graphql";

export async function getCollectionBySlug(slug: string) {
	const { collections } = await executeGraphql(CollectionsGetByCollectionSlugDocument, { slug });

	return collections[0];
}
