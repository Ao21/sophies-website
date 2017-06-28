import FieldGQLFile from "./field.gql";
import { TextField } from "./field.mongodb";
import { Field as FieldModel } from "./field.graphql";

import { GenericFieldRepository } from './field.mongodb';

// Checkout https://github.com/koistya/graphql-express-mongodb-example


import {
    buildSchema,
    GraphQLFieldConfig,
    GraphQLList,
    GraphQLID
} from "graphql";

const getField: GraphQLFieldConfig<any, any> = {
    type: new GraphQLList(FieldModel),
    args: {
        where: { type: GraphQLID },
        id: { type: GraphQLID }
    },
    resolve: function(root: any, { id }: { id: string }) {
		const repo = new GenericFieldRepository();

		
		return [
            {
                type: "group",
                id: "3",
                key: "date",
                childFields: [{ type: "date", id: "3", key: "date" }]
            },
            { type: "date", id: "3", key: "date" },
            { type: "text", id: "3", key: "text" }
        ];
    }
};

export const FieldQuery = {
    getField: getField
};

export class Field {}
