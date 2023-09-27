export const ProductCoverImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md">
			<img
				src={src}
				alt={alt}
				width={320}
				height={320}
				className="h-full w-full object-cover object-center p-3"
			/>
		</div>
	);
};
