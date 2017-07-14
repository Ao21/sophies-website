import * as mongoose from "mongoose";
import { RepositoryBase } from "./../../../common/mongo/generic-repository";
import { AssetModel } from "./assets.model";

export const AssetsSchema = new mongoose.Schema({
	path: String,
	originalname: String,
	mimetype: String,
	filename: String,
	category: [String],
	dateCreated: {type: Date, default: Date.now}
});

export interface AssetInputSchema extends mongoose.Document {
	path: String;
	originalname: String;
	mimetype: String;
	filename: String;
	category: [String];
	dateCreated: Date;
}

AssetsSchema.virtual("id").get(() => this.id);
AssetsSchema.set("toObject", { virtuals: true });
AssetsSchema.set("toJSON", { virtuals: true });

export const Asset = mongoose.model("Asset", AssetsSchema, "Assets");

export class AssetRepository extends RepositoryBase<AssetModel> {
	constructor() {
		super(Asset);
	}
}
