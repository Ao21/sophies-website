import * as express from "express";

import { Models } from "./../models/models.controller";

import { GraphQl } from "./graphql/graphql.controller";

export class BaseAPI {
    public models: Models;
    public graphQl: GraphQl;

	constructor() {
        this.models = new Models();
        this.graphQl = new GraphQl(this.models);
    }

    getRoutes(): express.Router[] {
        return [
            this.graphQl.router
        ]
    }
}
