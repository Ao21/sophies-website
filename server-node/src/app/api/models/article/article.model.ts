import * as mongoose from "mongoose";
import { GraphQLID, GraphQLFieldConfig, GraphQLList } from "graphql";

import { BlockModel } from "./../block/block.model";
import { Article, ArticleInput } from "./article.graphql";
import { ArticleRepository } from "./article.mongodb";

export interface ArticleModel extends mongoose.Document {
	name: string;
	title: string;
	slug: string;
	description: string;
	dateCreated: string;
	dateUpdated: string
	blocks?: [BlockModel];
}

/**
 * Article Query Functions
 */

const get: GraphQLFieldConfig<any, any> = {
	type: Article,
	args: {
        id: { type: GraphQLID }
    },
    async resolve(root: any, { id }: { id: string }) {
        const repo = new ArticleRepository();
        const response = await repo.findById(id).exec();
        return response.toJSON();
    }
}

const retrieve: GraphQLFieldConfig<any, any> = {
    type: new GraphQLList(Article),
    async resolve(root: any, { id }: { id: string }) {
        const repo = new ArticleRepository();
        const response = await repo.find().exec();
        return response;
    }
};

/**
 * Block Mutation Functions
 */

const create: GraphQLFieldConfig<any, any> = {
    type: Article,
    args: {
        article: { type: ArticleInput },
    },
    async resolve(root: any, { article }: { article: ArticleModel }) {
        const repo = new ArticleRepository();
		const response = await repo.create(article)
        return response;
    }
};

export const ArticleQuery = {
	article: get,
	articles: retrieve
}

export const ArticleMutation = {
	createArticle: create
}
