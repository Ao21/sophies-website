import * as express from "express";

import * as multer from "multer";
import { extname } from "path";
import { pseudoRandomBytes } from "crypto";

const multerStorage = multer.diskStorage({
	destination: "uploads/",
	filename: function (req, file, cb) {
		pseudoRandomBytes(16, (err, raw) => {
			if (err) {
				return cb(err, null);
			}
			cb(null, raw.toString("hex") + extname(file.originalname))
		});
	}
});
const upload = multer({ storage: multerStorage });

import { checkJwt } from "./../../../services/auth.service";
import { checkScopes } from "./../../../services/jwt-scope";

import { AssetRepository } from "./../../models/assets/assets.mongodb";

export class UploadRoute {
	router: express.Router;

	constructor() {
		this.router = express.Router();
	}

	createRoutes(): express.Router {
		this.router.post(
			"/upload",
			// checkJwt,
			upload.single("file"),
			async (req: express.Request, res: express.Response) => {
				// const repo = new AssetRepository();
				// const fileInfo: any = req.file;

				// await repo.create(fileInfo);
				res.status(200).send(req.file);
			}
		);
		return this.router;
	}
}
