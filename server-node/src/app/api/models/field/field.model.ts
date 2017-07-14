import * as mongoose from "mongoose";

import { TextField } from "./field.mongodb";
import {
	Field,
	FieldInput,
	FieldConfigInput,
	FieldUpdateSettings
} from "./field.graphql";

import { GenericFieldRepository, getRepoType } from "./field.mongodb";

import { AssetInput } from "../assets/assets.graphql";
import { AssetInputSchema } from "../assets/assets.mongodb";

import { MongooseResponse } from "./../../../common/mongo/generic-reponse";

// Checkout https://github.com/koistya/graphql-express-mongodb-example

import {
	buildSchema,
	GraphQLFieldConfig,
	GraphQLList,
	GraphQLBoolean,
	GraphQLID,
	GraphQLNonNull,
	GraphQLString
} from "graphql";

export interface FieldInput extends mongoose.Document {
	key: string;
	type: string;
	label?: string;
	required?: boolean;
	placeholder?: string;
	options: [any];
	childFields: [any];
	config: FieldConfigInput;
}

export interface FieldConfigInput extends mongoose.Document {
	label?: string;
	placeholder?: string;
	required?: boolean;
	categories?: string[];
	max: number;
}

export interface FieldUpdateSettings extends mongoose.Document {
	previousField: string;
}

export interface FieldModel extends mongoose.Document {
	key: string;
	type: string;
	config?: {
		label?: string;
		placeholder?: string;
		required?: boolean;
		validators?: string[];
		categories?: string[];
		max: number
	};
	value?: any;
	options: [any];
	childFields: [any];
}

/**
 * Field Query Functions
 */

const get: GraphQLFieldConfig<any, any> = {
	type: Field,
	args: {
		id: { type: GraphQLID }
	},
	async resolve(root: any, { id }: { id: string }) {
		const repo = new GenericFieldRepository();
		const response = await repo.findById(id).exec();
		return response.toJSON();
	}
};

const retrieve: GraphQLFieldConfig<any, any> = {
	type: new GraphQLList(Field),
	async resolve(root: any, { id }: { id: string }) {
		const repo = new GenericFieldRepository();
		const response = await repo.find().exec();
		return response;
	}
};

/**
 * Field Mutation Functions
 */

const create: GraphQLFieldConfig<any, any> = {
	type: Field,
	args: {
		field: { type: FieldInput },
		assets: { type: AssetInput },
		config: { type: FieldConfigInput },
		settings: { type: FieldUpdateSettings }
	},
	async resolve(
		root: any,
		{
			field,
			assets,
			config,
			settings
		}: {
			field: FieldInput;
			assets: AssetInputSchema;
			config: FieldConfigInput;
			settings: FieldUpdateSettings;
		}
	) {
		if (settings.previousField) {
			const previousType = getRepoType(settings.previousField);
			await previousType.delete(field.id);
		}
		const repo = getRepoType(field.type);
		field.config = config;
		const response = await repo.create(field);
		return response;
	}
};

const update: GraphQLFieldConfig<any, any> = {
	type: Field,
	args: {
		field: { type: FieldInput },
		config: { type: FieldConfigInput },
		settings: { type: FieldUpdateSettings }
	},
	async resolve(
		root: any,
		{
			field,
			assets,
			config,
			settings
		}: {
			field: FieldInput;
			assets: AssetInputSchema;
			config: FieldConfigInput;
			settings: FieldUpdateSettings;
		}
	) {
		const repo = getRepoType(field.type);
		field.config = config;
		const response = await repo.update(field.id, field);

		console.log("update", response);
		return field;
	}
};

const remove: GraphQLFieldConfig<any, any> = {
	type: GraphQLBoolean,
	description: "Remove a field",
	args: {
		id: { type: new GraphQLNonNull(GraphQLID) },
		type: { type: new GraphQLNonNull(GraphQLString) }
	},
	async resolve(value, { id, type }) {
		const repo = getRepoType(type);
		await repo.delete(id);
		try {
			await repo.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
};

export const FieldQuery = {
	field: get,
	fields: retrieve
};

export const FieldMutation = {
	createField: create,
	updateField: update,
	removeField: remove
};
