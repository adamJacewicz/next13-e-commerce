"use client";
import { type FormEvent, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("query") ?? "";
	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		stop();
		const formData = new FormData(e.currentTarget);
		const value = formData.get("query")?.toString() ?? "";
		router.push(`/search?query=${value}`);
	}

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		router.push(`/search?query=${value}`);
	}

	const [debouncedOnChange, stop] = useDebounce(onChange, 500);

	return (
		<form role="search" onSubmit={onSubmit}>
			<Input
				className="border border-slate-700"
				onChange={debouncedOnChange}
				type="search"
				role="searchbox"
				name="query"
				defaultValue={query}
				placeholder="Search..."
			/>
		</form>
	);
}
