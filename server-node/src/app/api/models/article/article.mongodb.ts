import * as mongoose from "mongoose";
import { RepositoryBase } from "./../../../common/mongo/generic-repository";

import { ArticleModel } from "./article.model";
import { BlockModel } from "./../block/block.model";

export const ArticleSchema = new mongoose.Schema({
	name: String,
	title: String,
	description: String,
	dateCreated: Date,
	dateUpdated: Date,
	blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Block" }]
})

ArticleSchema.virtual("id").get(() => this.id);
ArticleSchema.set("toObject", { virtuals: true });
ArticleSchema.set("toJSON", { virtuals: true });

export const Article = mongoose.model("Article", ArticleSchema, "Articles", true);

export class ArticleRepository extends RepositoryBase<ArticleModel> {
    constructor() {
        super(Article);
    }
}
