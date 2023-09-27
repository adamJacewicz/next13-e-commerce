import { Loader2 as Loader } from "lucide-react";

export function LoadingIndicator() {
	return <Loader aria-busy="true" aria-atomic="false" className="mx-auto h-24 w-24 animate-spin" />;
}
