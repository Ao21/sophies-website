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

import { Field, FieldInput } from "./../field/field.graphql";

export const BlockInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: "BlockInterface",
    fields: {
        id: { type: GraphQLID},
		name: { type: GraphQLString },
		fields: { type: new GraphQLList(Field)}
    },
    resolveType(value) {
        return Block
    }
});

export const Block: GraphQLObjectType = new GraphQLObjectType({
	name: "Block",
	interfaces: [BlockInterface],
    fields: {
        id: { type: GraphQLID},
		name: { type: GraphQLString },
		fields: { type: new GraphQLList(Field)}
	}
})

export const BlockInput: GraphQLInputObjectType = new GraphQLInputObjectType({
	name: "BlockInput",
	fields: {
		name: { type: GraphQLString },
		fields: { type: new GraphQLList(FieldInput)}
	}
})
