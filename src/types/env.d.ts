declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			GRAPHQL_URL: string;
			GRAPHQL_TOKEN: string;
			STRIPE_SECRET_KEY: string;
			STRIPE_WEBHOOK_SECRET: string;
			NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
			CLERK_SECRET_KEY: string;
			NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
			NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
			NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
			NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
		}
	}
}
