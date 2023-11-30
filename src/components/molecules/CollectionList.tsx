import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
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

			<div className="flex items-center gap-5">
				{collectionLinks.map((collection) => (
					<Link
						href={collection.href}
						className="rounded-md bg-gray-100 p-8"
						key={collection.label}
					>
						<header className="mb-2 flex items-center gap-3 font-medium">
							<h3>{collection.label}</h3>
							<ArrowRight height={18} width={18} className="text-blue-600" />
						</header>
						<p className="text-sm text-gray-600">{collection.description}</p>
					</Link>
				))}
			</div>
		</section>
	);
}
