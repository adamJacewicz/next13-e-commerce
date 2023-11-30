import Stripe from "stripe";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { sessionId: string };
}) {
	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.retrieve(searchParams.sessionId);

	// if (checkoutSession.metadata?.cartId) {
	// 	await addStripeCheckoutId(
	// 		checkoutSession.metadata.cartId,
	// 		checkoutSession.customer_details?.email ?? "",
	// 		checkoutSession.id,
	// 	);
	// }

	return <div>{checkoutSession.payment_status}</div>;
}
