import * as express from "express";
import { env } from "./../environments/environment";

import { BaseAPI } from "./api/api.controller";

export class Server {
    public app: express.Application;
    public api: BaseAPI;

	public static boostrap() {
		return new Server();
	}

	constructor() {
        this.app = express();
        this.api = new BaseAPI();
        this.config();

        this.app.use(this.api.getRoutes());
	}
	config() {
		this.app.listen(env.settings.node.port, function() {
			console.log("Example app listening on port 3000!");
		});
	}
}
