import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clihaom3j03ep01te1dg24yp5/master",
	documents: "src/graphql/*.graphql",
	ignoreNoDocuments: true,
	generates: {
		"src/gql/": {
			presetConfig: {
				fragmentMasking: false,
			},
			preset: "client",
			plugins: [],
			config: {
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				useTypeImports: true,
				skipTypename: true,
				documentMode: "string",
			},
		},
	},
};

export default config;
