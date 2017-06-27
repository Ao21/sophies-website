import { Models } from './../models/models.module';
import { GraphQlRoutes } from './graphql/graphql.route';
export class BaseRoutes {
	models: Models;
	private routes: any[] = [];
    constructor({ models }: { models: Models }) {
		this.models = models;
		const graphRoutes = new GraphQlRoutes({ models: this.models });
		this.routes.push(graphRoutes.createRoutes());
	}

	getRoutes() {
		return this.routes;
	}
}
