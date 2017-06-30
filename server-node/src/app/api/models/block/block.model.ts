import * as mongoose from "mongoose";
import { GraphQLID, GraphQLFieldConfig, GraphQLList } from "graphql";

import { FieldModel } from "./../field/field.model";
import { Block, BlockInput } from "./block.graphql";
import { BlockRepository } from "./block.mongodb";

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
        block: { type: BlockInput },
    },
    async resolve(root: any, { block }: { block: BlockModel }) {
        const repo = new BlockRepository();
		const response = await repo.create(block)
        return response;
    }
};

export const BlockQuery = {
    block: get,
    blocks: retrieve
}

export const BlockMutation = {
    createBlock: create
}
