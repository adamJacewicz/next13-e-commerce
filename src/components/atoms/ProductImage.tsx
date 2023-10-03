import NextImage from "next/image";

export const ProductImage = ({
	src,
	alt,
	width = 256,
	height = 256,
}: {
	src: string;
	alt: string;
	width?: number;
	height?: number;
}) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md">
			<NextImage
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="h-full w-full object-cover object-center p-3"
			/>
		</div>
	);
};
