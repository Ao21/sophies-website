import * as mongoose from "mongoose";
import { GraphQLID, GraphQLFieldConfig, GraphQLList } from "graphql";

import { FieldModel } from "./../field/field.model";
import { Block, BlockInput } from "./block.graphql";
import { BlockRepository } from "./block.mongodb";

import { getProjection } from "./../../../common/utils/astProjections";

import infoToProjection from "graphql-mongodb-projection";


/**
 * Current Plan is to use block models and field models as templates, which
 * are then just stored as normal objects inside of the articles, which will be unique
 * while the Block/Fields are just stored sets that are projected in the find queries
 */

export interface BlockModel extends mongoose.Document {
	name: string;
	fields: [FieldModel];
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
		const response = await repo.findById(id).exec();
		return response.toJSON();
	}
};

const retrieve: GraphQLFieldConfig<any, any> = {
	type: new GraphQLList(Block),
	async resolve(root: any, { id }: { id: string }) {
		const repo = new BlockRepository();
		const response = await repo.find().exec();
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
		const response = await repo.create(block)
		return response;
	}
};

export const BlockQuery = {
	block: get,
	blocks: retrieve
};

export const BlockMutation = {
	createBlock: create
};
