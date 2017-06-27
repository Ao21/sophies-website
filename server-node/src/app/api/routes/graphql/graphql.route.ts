import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { Models } from './../../models/models.module';

export class GraphQlRoutes {
    router: express.Router;
    models: Models;
    constructor({ models }: { models: Models }) {
        this.models = models;
        this.router = express.Router();
    }

    createRoutes(): express.Router {
        this.router.use(
            '/graphql',
            graphqlHTTP({
                schema: buildSchema(this.models.schema),
                rootValue: this.models.resolver,
                graphiql: true
            })
        );
        return this.router;
    }
}
