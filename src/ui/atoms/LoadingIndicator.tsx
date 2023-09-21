export function LoadingIndicator() {
	return (
		<div aria-busy="true" aria-atomic="false">
			<div className="h-10 w-10 animate-spin rounded-full border-r-2 border-t-2 border-r-transparent border-t-slate-100" />
			<span className="sr-only">Loading...</span>
		</div>
	);
}
