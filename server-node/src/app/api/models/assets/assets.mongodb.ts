import * as mongoose from "mongoose";
import { RepositoryBase } from "./../../../common/mongo/generic-repository";
import { AssetModel } from "./assets.model";

export const AssetsSchema = new mongoose.Schema({
	path: String,
	originalname: String,
	mimetype: String,
	filename: String,
});

AssetsSchema.virtual("id").get(() => this.id);

export const Asset = mongoose.model("Asset", AssetsSchema, "Assets");

export class AssetRepository extends RepositoryBase<AssetModel> {
	constructor() {
		super(Asset);
	}
}
