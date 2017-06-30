import * as express from "express";
import { checkJwt } from "./../../../services/auth.service";
import { checkScopes } from "./../../../services/jwt-scope";

export class UploadRoute {
	router: express.Router;

	constructor() {
		this.router = express.Router();
	}

	createRoutes(): express.Router {
		this.router.use(
			"/upload",
			checkJwt,
			(req: express.Request, res: express.Response) => {
				res.json({
					message:
						"Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
				});
			}
		);
		return this.router;
	}
}
