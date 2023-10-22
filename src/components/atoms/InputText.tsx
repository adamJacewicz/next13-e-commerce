import { type ComponentPropsWithoutRef } from "react";
import { Icon } from "@/components/atoms/Icon";
import { type IconName } from "@/types/types";

type InputTextProps = {
	prefixIcon?: IconName;
	suffixIcon?: IconName;
} & ComponentPropsWithoutRef<"input">;

export function InputText({ prefixIcon, suffixIcon, ...rest }: InputTextProps) {
	return (
		<div className="flex items-center rounded-md border border-gray-500 bg-white px-1.5 py-1 text-sm text-black focus-within:ring">
			{prefixIcon && (
				<Icon width={18} height={18} className="mr-1 text-gray-400" name={prefixIcon} />
			)}
			<input
				className="block appearance-none placeholder:text-gray-400 focus:outline-none"
				type="text"
				{...rest}
			/>
			{suffixIcon && (
				<Icon className="ml-2 text-gray-400" width={18} height={18} name={suffixIcon} />
			)}
		</div>
	);
}
