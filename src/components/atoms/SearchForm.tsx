"use client";
import { type FormEvent, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InputText } from "@/components/atoms/InputText";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("query") ?? "";
	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const value = formData.get("query")?.toString() ?? "";
		router.push(`/search?query=${value}`);
	}
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		router.push(`/search?query=${value}`);
	}

	const debouncedOnChange = useDebounce(onChange, 500);

	return (
		<form role="search" onSubmit={onSubmit}>
			<InputText
				onChange={debouncedOnChange}
				type="search"
				role="searchbox"
				name="query"
				suffixIcon="search"
				defaultValue={query}
				placeholder="Search..."
			/>
		</form>
	);
}
