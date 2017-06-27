import * as express from "express";
import * as graphqlHTTP from "express-graphql";

import { Models } from "./../../models/models.controller";

export class GraphQl {
	public router: express.Router;

	constructor(
		private models: Models
	) {
		this.router = express.Router();
		this.routes();
	}

	routes() {

		this.router.use(
			"/graphql",
			graphqlHTTP({
				schema: this.models.baseModel.root,
				graphiql: true
			})
		);
	}
}
