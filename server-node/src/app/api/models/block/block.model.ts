import * as mongoose from "mongoose";
import {
	GraphQLID,
	GraphQLFieldConfig,
	GraphQLList,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLString
} from "graphql";

import { FieldModel } from "./../field/field.model";
import { Block, BlockInput } from "./block.graphql";
import { BlockRepository } from "./block.mongodb";

import { AssetInput } from "../assets/assets.graphql";
import { AssetInputSchema } from "../assets/assets.mongodb";
import { getProjection } from "./../../../common/utils/astProjections";

import infoToProjection from "graphql-mongodb-projection";

/**
 * Current Plan is to use block models and field models as templates, which
 * are then just stored as normal objects inside of the articles, which will be unique
 * while the Block/Fields are just generics that are projected in the queries
 */

export interface BlockModel extends mongoose.Document {
	name: string;
	tag: String;
	img: [String];
	singleOnly: Boolean;
	fields: [FieldModel];
	categories: string[];
}

/**
 * Block Query Functions
 */

const get: GraphQLFieldConfig<any, any> = {
	type: Block,
	args: {
		id: { type: GraphQLID }
	},
	async resolve(root: any, { id }: { id: string }) {
		const repo = new BlockRepository();
		const response = await repo
			.findById(id)
			.populate("fields")
			.populate("img")
			.exec();
		return response.toJSON();
	}
};

const retrieve: GraphQLFieldConfig<any, any> = {
	type: new GraphQLList(Block),
	async resolve(root: any, { id }: { id: string }) {
		const repo = new BlockRepository();
		const response = await repo
			.find()
			.populate("fields")
			.populate("img")
			.exec();
		return response;
	}
};

/**
 * Block Mutation Functions
 */

const create: GraphQLFieldConfig<any, any> = {
	type: Block,
	args: {
		block: { type: BlockInput }
	},
	async resolve(root: any, { block }: { block: BlockModel }, src, fieldAST) {
		const projections = infoToProjection(fieldAST);
		const repo = new BlockRepository();
		const response = await repo.create(block);
		return response;
	}
};

const update: GraphQLFieldConfig<any, any> = {
	type: Block,
	args: {
		block: { type: BlockInput }
	},
	async resolve(root: any, { block }: { block: BlockModel }, src, fieldAST) {
		const projections = infoToProjection(fieldAST);
		const repo = new BlockRepository();
		const response = await repo.update(block.id, block);
		return response;
	}
};

const remove: GraphQLFieldConfig<any, any> = {
	type: GraphQLBoolean,
	description: "Remove a field",
	args: {
		id: { type: new GraphQLNonNull(GraphQLID) }
	},
	async resolve(value, { id, type }) {
		const repo = new BlockRepository();
		await repo.delete(id);
		try {
			await repo.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
};

export const BlockQuery = {
	block: get,
	blocks: retrieve
};

export const BlockMutation = {
	createBlock: create,
	updateBlock: update,
	removeBlock: remove
};
