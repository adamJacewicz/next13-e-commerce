import NextImage from "next/image";
import { cn } from "@/lib/utils";

export const ProductImage = ({
	src,
	alt,
	width = 256,
	height = 256,
	className,
}: {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
}) => {
	return (
		<div className={cn("aspect-square overflow-hidden rounded-md p-6", className)}>
			<NextImage
				priority
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="h-full w-full object-cover object-center"
			/>
		</div>
	);
};
