import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { buildSchema, GraphQLSchema } from "graphql";
import { Models } from "./../../models/models.module";

import { query, mutation } from "./../../models/field/field.graphql";

export class GraphQlRoutes {
    router: express.Router;
    models: Models;

    constructor({ models }: { models: Models }) {
        this.models = models;
        this.router = express.Router();
    }

    createRoutes(): express.Router {

		const schema = new GraphQLSchema({query: query, mutation: mutation});

        this.router.use(
            "/graphql",
            graphqlHTTP({
                schema: schema,
                graphiql: true
            })
        );
        return this.router;
    }
}
