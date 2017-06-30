import * as mongoose from "mongoose";

import { TextField } from "./field.mongodb";
import { Field, FieldInput } from "./field.graphql";

import { GenericFieldRepository } from "./field.mongodb";

// Checkout https://github.com/koistya/graphql-express-mongodb-example

import {
    buildSchema,
    GraphQLFieldConfig,
    GraphQLList,
    GraphQLID
} from "graphql";

export interface FieldModel extends mongoose.Document {
    key: String;
    type: String;
    config?: {
        label?: String;
        placeholder?: String;
        required?: Boolean;
        validators?: [String];
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
    },
    async resolve(root: any, { field }: { field: FieldModel }) {
        const repo = new GenericFieldRepository();
		const response = await repo.create(field)
        return response;
    }
};


export const FieldQuery = {
    field: get,
    fields: retrieve,
};

export const FieldMutation = {
    createField: create
}

