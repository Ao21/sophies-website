import development from "./development";
import production from "./production";

interface Environment {
	settings: {
		node: {
			port: number;
		};
	};
	urls: {};
}

function getEnvironment(): Environment {
	switch (process.env["NODE_ENV"]) {
		case "production":
			return production;
		default:
			return development;
	}
}

export const env = getEnvironment();
