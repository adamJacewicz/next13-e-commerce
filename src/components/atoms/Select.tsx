"use client";
import { Listbox } from "@headlessui/react";
import { ChevronDown, XCircle } from "lucide-react";
import { useId, useState, type MouseEvent } from "react";

type SelectOption = {
	label: string;
	value: string | number;
	id: string | number;
	disabled?: boolean;
};

type SelectProps = {
	options: SelectOption[];
	value?: SelectOption;
	placeholder?: string;
	label?: string;
	defaultFirstOption?: boolean;
	clearable?: boolean;
};

export function Select({
	options,
	value,
	placeholder,
	label,
	defaultFirstOption = false,
	clearable = false,
}: SelectProps) {
	const [selectedOption, setSelectedOption] = useState(
		value ?? (defaultFirstOption ? options[0] : null),
	);
	const inputId = useId();

	const clear = (e: MouseEvent) => {
		e.stopPropagation();
		setSelectedOption(null);
	};
	return (
		<Listbox
			as="div"
			className="relative text-sm"
			value={selectedOption}
			onChange={setSelectedOption}
		>
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
					<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg focus:outline-none focus-visible:ring">
						{options.map((option, id) => (
							<Listbox.Option
								disabled={!!option.disabled}
								className={({ active, selected, disabled }) =>
									`cursor-pointer select-none truncate px-4 py-2 ${active && "bg-blue-100"} ${
										selected && "font-medium text-blue-600"
									} ${disabled && "pointer-events-none text-gray-400"}`
								}
								key={id}
								value={option}
							>
								{option.label}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</>
			)}
		</Listbox>
	);
}
