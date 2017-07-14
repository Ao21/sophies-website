import * as mongoose from 'mongoose';
import {
	GraphQLID,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLFieldConfig,
	GraphQLList
} from 'graphql';

import { BlockModel } from './../block/block.model';
import { Article, ArticleInput } from './article.graphql';
import { ArticleRepository } from './article.mongodb';

/**
 * Current Idea: Use the articles repos to store the whole thing, using the blocks/templates
 * query projection to build an object to store as a normal (non projected) object inside the articles
 */

export interface ArticleModel extends mongoose.Document {
	name: string;
	title: string;
	slug: string;
	description: string;
	dateCreated: Date;
	dateUpdated: string;
	blocks?: any;
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
};

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
 *
 */

const create: GraphQLFieldConfig<any, any> = {
	type: Article,
	args: {
		article: { type: ArticleInput }
	},
	async resolve(root: any, { article }: { article: ArticleModel }) {
		article.blocks = JSON.parse(article.blocks);
		const repo = new ArticleRepository();
		const response = await repo.create(article);
		return response;
	}
};

const update: GraphQLFieldConfig<any, any> = {
	type: Article,
	args: {
		article: { type: ArticleInput }
	},
	async resolve(
		root: any,
		{ article }: { article: ArticleModel },
		src,
		fieldAST
	) {
		article.blocks = JSON.parse(article.blocks);
		article.dateUpdated = <any>Date.now();
		const repo = new ArticleRepository();
		const response = await repo.update(article.id, article);
		return article;
	}
};

const remove: GraphQLFieldConfig<any, any> = {
	type: GraphQLBoolean,
	description: 'Remove an article',
	args: {
		id: { type: new GraphQLNonNull(GraphQLID) }
	},
	async resolve(value, { id, type }) {
		const repo = new ArticleRepository();
		await repo.delete(id);
		try {
			await repo.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
};

export const ArticleQuery = {
	article: get,
	articles: retrieve
};

export const ArticleMutation = {
	createArticle: create,
	updateArticle: update,
	removeArticle: remove
};
