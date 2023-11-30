import { type ReactNode } from "react";

export function PageHeader({ children }: { children: ReactNode }) {
	return <h2 className="mx-6 my-10 text-2xl">{children}</h2>;
}
