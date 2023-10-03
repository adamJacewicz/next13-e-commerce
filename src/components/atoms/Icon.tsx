import { type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { type IconName } from "@/types/types";

type IconProps = {
	name: IconName;
} & LucideProps;

export function Icon({ name, ...props }: IconProps) {
	const LucideIcon = dynamic(dynamicIconImports[name]);
	return <LucideIcon {...props} />;
}
