import * as mongoose from "mongoose";

export const ArticleSchema = new mongoose.Schema({
	name: String,
	title: String,
	description: String,
	dateCreated: Date,
	dateUpdated: Date,
	blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Block" }]
})
