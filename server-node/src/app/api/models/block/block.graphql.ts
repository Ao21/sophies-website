import {
    GraphQLInterfaceType,
    GraphQLFieldConfig,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLUnionType,
    GraphQLEnumType,
    GraphQLObjectType,
    GraphQLNonNull
} from "graphql";

import { Field, FieldInput, FieldInterface } from "./../field/field.graphql";
import { AssetInput ,Asset } from "./../assets/assets.graphql";

export const BlockInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: "BlockInterface",
    fields: {
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        tag: { type: GraphQLString },
        img: { type: new GraphQLList(Asset) },
        singleOnly: {type: GraphQLBoolean},
		fields: { type: new GraphQLList(Field)}
    },
    resolveType(value) {
        return Block;
    }
});

export const Block: GraphQLObjectType = new GraphQLObjectType({
	name: "Block",
	interfaces: [BlockInterface],
    fields: {
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        img: { type: new GraphQLList(Asset) },
        tag: { type: GraphQLString },
        singleOnly: {type: GraphQLBoolean},
		fields: { type: new GraphQLList(Field)}
	}
});

export const BlockInput: GraphQLInputObjectType = new GraphQLInputObjectType({
	name: "BlockInput",
	fields: {
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        img: { type: new GraphQLList(GraphQLString) },
        tag: { type: GraphQLString },
        singleOnly: {type: GraphQLBoolean},
		fields: { type: new GraphQLList(GraphQLID)}
	}
});
