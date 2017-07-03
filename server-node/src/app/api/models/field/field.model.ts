import * as mongoose from "mongoose";

import { TextField } from "./field.mongodb";
import { Field, FieldInput } from "./field.graphql";

import { GenericFieldRepository, getRepoType } from "./field.mongodb";

// Checkout https://github.com/koistya/graphql-express-mongodb-example

import {
    buildSchema,
    GraphQLFieldConfig,
    GraphQLList,
    GraphQLID
} from "graphql";

export interface FieldModel extends mongoose.Document {
    key: string;
    type: string;
    config?: {
        label?: string;
        placeholder?: string;
        required?: boolean;
        validators?: [string];
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
        console.log(field);
        const repo =  getRepoType(field.type);
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

