import * as mongoose from "mongoose";
import { GraphQLID, GraphQLFieldConfig, GraphQLList } from "graphql";

import { Asset } from "./assets.graphql";
import { AssetRepository } from "./assets.mongodb";

export interface AssetModel extends mongoose.Document {
	path: string;
	originalname: string;
	mimetype: string;
	filename: string;
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

export const AssetQuery = {
	asset: get,
	assets: retrieve
};





