import { Models } from "./models/models.module";
import { BaseRoutes } from "./routes/routes.module";

export class BaseAPI {
	models: Models;
	baseRoutes: BaseRoutes;
	constructor() {
		this.models = new Models();
		this.baseRoutes = new BaseRoutes({ models: this.models });
	}

	getRoutes() {
		return this.baseRoutes.getRoutes();
	}
}
