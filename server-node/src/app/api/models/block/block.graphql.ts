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

import { Field } from "./../field/field.graphql";

export const BlockInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: "BlockInterface",
    fields: {
		name: { type: GraphQLString },
		fields: { type: new GraphQLList(Field)}
    }
});

export const Block: GraphQLObjectType = new GraphQLObjectType({
	name: "Block",
	interfaces: [BlockInterface],
	fields: {
		name: { type: GraphQLString },
		fields: { type: new GraphQLList(Field)}
	}
})
