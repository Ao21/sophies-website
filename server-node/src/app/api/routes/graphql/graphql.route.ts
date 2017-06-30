import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { buildSchema, GraphQLSchema } from "graphql";
import { Models } from "./../../models/models.module";

import { BaseQuery, BaseMutation } from "./../../models/base/base.model";

export class GraphQlRoutes {
    router: express.Router;
    models: Models;

    constructor({ models }: { models: Models }) {
        this.models = models;
        this.router = express.Router();
    }

    createRoutes(): express.Router {

		const schema = new GraphQLSchema({query: BaseQuery, mutation: BaseMutation});

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
