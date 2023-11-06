"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Route } from "next";

import { Listbox } from "@headlessui/react";
import { ChevronDown, XCircle } from "lucide-react";
import { useId, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { ORDER_OPTIONS } from "@/constants";

type SelectOption = {
	label: string;
	value: string | number;
	disabled?: boolean;
};

type SelectProps = {
	options: SelectOption[];
	value?: string | number;
	children: ReactNode;
	onChange?: (value: SelectOption) => void;
	placeholder?: string;
	label?: string;
	defaultFirstOption?: boolean;
	clearable?: boolean;
};

function ListboxOption({
	option,
	children,
	...rest
}: {
	option: SelectOption;
	children: ReactNode;
}) {
	return (
		<Listbox.Option
			disabled={!!option.disabled}
			className={({ active, selected, disabled }) =>
				`cursor-pointer select-none truncate ${active && "bg-blue-100"} ${
					selected && "font-medium text-blue-600"
				} ${disabled && "pointer-events-none text-gray-400"}`
			}
			{...rest}
			value={option}
		>
			{children}
		</Listbox.Option>
	);
}

export function Select({
	options,
	value,
	placeholder,
	onChange,
	label,
	defaultFirstOption = false,
	children,
	clearable = false,
}: SelectProps) {
	const [selectedOption, setSelectedOption] = useState(
		options.find((option) => option.value === value) ?? (defaultFirstOption ? options[0] : null),
	);
	const inputId = useId();

	const clear = (e: MouseEvent) => {
		e.stopPropagation();
		setSelectedOption(null);
	};

	function changeHandler(value: SelectOption) {
		setSelectedOption(value);
		onChange?.(value);
	}

	return (
		<Listbox as="div" className="relative text-sm" value={selectedOption} onChange={changeHandler}>
			{({ open }) => (
				<>
					<Listbox.Label htmlFor={inputId} className="my-2 block">
						{label}
					</Listbox.Label>

					<Listbox.Button
						id={inputId}
						className={`flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border border-gray-300 bg-white px-3 py-2 text-left shadow-md focus:outline-none focus-visible:ring ${
							clearable &&
							selectedOption?.value &&
							"[&_.chevron]:hover:hidden [&_.clear]:hover:block"
						}`}
					>
						<input
							autoComplete="off"
							tabIndex={0}
							readOnly
							placeholder={placeholder}
							value={selectedOption?.label ?? ""}
							className={`block w-full cursor-pointer truncate placeholder-shown:placeholder:text-gray-400 focus:outline-none`}
						/>

						<XCircle onClick={clear} className="clear hidden text-gray-400" />

						<ChevronDown
							className={`chevron text-gray-400 transition-transform duration-300 ${
								open && "-rotate-180"
							}`}
							aria-hidden="true"
						/>
					</Listbox.Button>
					<Listbox.Options
						unmount={false}
						className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg focus:outline-none focus-visible:ring"
					>
						{children}
					</Listbox.Options>
				</>
			)}
		</Listbox>
	);
}

export function SortSelect() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	return (
		<div className="w-full max-w-[190px]">
			<select
				onChange={(e) => router.push(`${pathname}?order=${e.currentTarget.value}` as Route)}
				value={searchParams.get("order") ?? ORDER_OPTIONS[0].value}
			>
				{ORDER_OPTIONS.map((option) => (
					<option value={option.value} data-testid={`sort-by-${option.type}`} key={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{/*<Select*/}
			{/*	onValueChange={(value) => router.push(`${pathname}?order=${value}` as Route)}*/}
			{/*	defaultValue={searchParams.get("order") ?? ORDER_OPTIONS[0].value}*/}
			{/*>*/}
			{/*	<SelectTrigger>*/}
			{/*		<SelectValue />*/}
			{/*	</SelectTrigger>*/}
			{/*	<SelectContent>*/}
			{/*		<SelectGroup>*/}
			{/*			{ORDER_OPTIONS.map((order) => (*/}
			{/*				<SelectItem*/}
			{/*					key={order.value}*/}
			{/*					value={order.value}*/}
			{/*					data-testid={`sort-by-${order.type}`}*/}
			{/*				>*/}
			{/*					{order.label}*/}
			{/*				</SelectItem>*/}
			{/*			))}*/}
			{/*		</SelectGroup>*/}
			{/*	</SelectContent>*/}
			{/*</Select>*/}
		</div>
	);
}
