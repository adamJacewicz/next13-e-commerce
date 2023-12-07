import { ImageResponse } from "next/og";
import Image from "next/image";
import { getProductById } from "@/service/product.service";

// export const runtime = "edge";
export const alt = "Ecommerce";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

type ProductOpengraphImageProps = {
	params: {
		productId: string;
	};
};

export default async function ProductOpengraphImage({ params }: ProductOpengraphImageProps) {
	const product = await getProductById(params.productId);

	if (!product) {
		return new ImageResponse(
			(
				<div
					style={{
						background: "#000",
						color: "white",
						fontSize: 24,
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<h1>No product found</h1>
				</div>
			),
		);
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 24,
					color: "white",
					background: "#000",
					width: "100%",
					height: "100%",
					padding: "40px",
					gap: "40px",
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						maxWidth: "65%",
						padding: "20px",
						alignSelf: "center",
					}}
				>
					<h1>{product.name}</h1>
					<p>{product.categories[0]?.name}</p>
					<p>{product.description}</p>
				</div>

				<div
					style={{
						maxWidth: "30%",
						margin: "50px 0",
						borderRadius: "16px",
						background: "white",
						display: "flex",
					}}
				>
					<Image alt={product.name} src={product.images[0]?.url} />
				</div>
			</div>
		),
		{ ...size },
	);
}
