import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

export default async function Products() {
	redirect("/products/1", RedirectType.replace);
}
