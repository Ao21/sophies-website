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
	GraphQLNonNull,
	GraphQLInt
} from "graphql";

export const TextValue: GraphQLObjectType = new GraphQLObjectType({
    name: "TextValue",
    fields: {
        value: { type: GraphQLString}
    }
});

export const Value: GraphQLUnionType = new GraphQLUnionType({
	name: "Value",
	types: [
		TextValue,
	],
	resolveType(value) {
		if (value.type === "text") {
			return TextValue;
		}
	}
});
