declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			GRAPHQL_URL: string;
			GRAPHQL_TOKEN: string;
		}
	}
}
