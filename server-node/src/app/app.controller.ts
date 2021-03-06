import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { env } from "./../environments/environment";

import { BaseAPI } from "./api/api.service";

export class Server {
	public app: express.Application;
	public api: BaseAPI;
	public mongoose: mongoose.Mongoose = mongoose;

	public static boostrap() {
		return new Server();
	}

	constructor() {
		this.app = express();
		this.api = new BaseAPI();
		this.config();

		this.app.use("/uploads", express.static("uploads"));

		this.app.use(this.api.getRoutes());
	}
	config() {
		// this.app.use(bodyParser.urlencoded({extended: true}));
		this.mongoose.connect("mongodb://localhost/sophie");
		this.app.listen(env.settings.node.port, function() {
			console.log("Example app listening on port 3000!");
		});
	}
}
