import { executeGraphql } from "@/lib/utils";
import { CollectionsGetByCollectionSlugDocument, CollectionsGetListDocument } from "@/gql/graphql";

export async function getCollectionBySlug(slug: string) {
	const { collections } = await executeGraphql({
		variables: { slug },
		query: CollectionsGetByCollectionSlugDocument,
	});

	return collections[0];
}

export async function getCollectionList() {
	const { collections } = await executeGraphql({
		query: CollectionsGetListDocument,
	});

	return collections;
}
