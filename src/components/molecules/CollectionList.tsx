import Link from "next/link";
import type { Route } from "next";
import { getCollectionList } from "@/service/collections.service";
import { type NavLink } from "@/types/types";

export async function CollectionList() {
	const collections = await getCollectionList();

	const collectionLinks: (NavLink & { description?: string | null })[] = collections.map(
		(collection) => ({
			exact: false,
			label: collection.name,
			href: `/collections/${collection.slug}` as Route,
			description: collection.description,
		}),
	);

	return (
		<section className="p-4">
			<h2 className="mx-auto mb-6 whitespace-nowrap text-center text-xl font-medium sm:text-xl md:text-2xl">
				Collections
			</h2>

			<div className="flex flex-wrap items-center gap-5">
				{collectionLinks.map((collection) => (
					<div
						className="flex-auto rounded-md bg-slate-200 px-4 py-2 shadow-xl"
						key={collection.label}
					>
						<h3 className="mb-2 text-lg font-medium">
							<Link className="block " href={collection.href}>
								{collection.label}
							</Link>
						</h3>
						<p>{collection.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
