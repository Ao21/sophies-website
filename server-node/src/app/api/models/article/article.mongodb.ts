import * as mongoose from "mongoose";
import { RepositoryBase } from "./../../../common/mongo/generic-repository";

import { ArticleModel } from "./article.model";
import { BlockModel } from "./../block/block.model";

import { Block, BlockSchema } from "./../block/block.mongodb";

import { BaseFieldSchema } from "./../field/field.mongodb";

export const ArticleSchema = new mongoose.Schema({
	name: String,
	title: String,
	visible: Boolean,
	description: String,
	dateCreated: { type: Date, default: Date.now },
	dateUpdated: { type: Date, default: Date.now },
	slug: String,
	blocks: [{
		img: [],
		singleOnly: String,
		tag: String,
		name: String,
		id: String,
		fields: []
	}]
});

ArticleSchema.virtual("id").get(() => this.id);
ArticleSchema.set("toObject", { virtuals: true });
ArticleSchema.set("toJSON", { virtuals: true });

export const Article = mongoose.model("Article", ArticleSchema, "Articles", true);

export class ArticleRepository extends RepositoryBase<ArticleModel> {
    constructor() {
        super(Article);
    }
}
