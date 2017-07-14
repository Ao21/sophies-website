import * as mongoose from "mongoose";
import { GraphQLID, GraphQLBoolean, GraphQLNonNull,  GraphQLFieldConfig, GraphQLList } from "graphql";

import { Asset, AssetInput } from "./assets.graphql";
import { AssetRepository } from "./assets.mongodb";

export interface AssetModel extends mongoose.Document {
	path: string;
	originalname: string;
	mimetype: string;
	filename: string;
	dateCreated: string;
}

/**
 * Asset Query Functions
 */
const get: GraphQLFieldConfig<any, any> = {
	type: Asset,
	args: {
		id: { type: GraphQLID }
	},
	async resolve(root: any, { id }: { id: string }) {
		const repo = new AssetRepository();
		const response = await repo.findById(id).exec();
		return response.toJSON();
	}
};


const retrieve: GraphQLFieldConfig<any, any> = {
	type: new GraphQLList(Asset),
	async resolve(root: any, { id }: { id: string }) {
		const repo = new AssetRepository();
		const response = await repo.find().exec();
		return response;
	}
};

const create: GraphQLFieldConfig<any, any> = {
    type: Asset,
    args: {
        asset: { type: AssetInput },
    },
    async resolve(root: any, { asset }: { asset: AssetModel }) {
        const repo = new AssetRepository();
		const response = await repo.create(asset);
        return response;
    }
};

const remove: GraphQLFieldConfig<any, any> = {
	type: GraphQLBoolean,
	description: "Remove an Asset",
	args: {
		id: { type: new GraphQLNonNull(GraphQLID) },
	},
	async resolve(value, { id, type }) {
		const repo = new AssetRepository();
		await repo.delete(id);
		try {
			await repo.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
};

export const AssetQuery = {
	asset: get,
	assets: retrieve
};

export const AssetMutation = {
	createAsset: create,
	removeAsset: remove
};





