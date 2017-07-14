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

import { Block, BlockInput } from "./../block/block.graphql";
export const ArticleInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: "ArticleInterface",
	fields: {
		name: { type: GraphQLString },
		title: { type: new GraphQLNonNull(GraphQLString) },
		slug: { type: GraphQLString },
		visible: { type: GraphQLBoolean },
		description: { type: GraphQLString },
        blocks: { type: new GraphQLList(Block) },
        dateCreated: { type: GraphQLString },
		dateUpdated: { type: GraphQLString },
	},
	resolveType(value) {
		return Article;
	}
});

export const Article: GraphQLObjectType = new GraphQLObjectType({
	name: "Article",
	interfaces: [ArticleInterface],
	fields: {
        id: {type: GraphQLID},
		name: { type: GraphQLString },
		title: { type: new GraphQLNonNull(GraphQLString) },
		slug: { type: GraphQLString },
		visible: { type: GraphQLBoolean },
		description: { type: GraphQLString },
        blocks: { type: new GraphQLList(Block) },
        dateCreated: { type: GraphQLString },
		dateUpdated: { type: GraphQLString },
	}
});

export const ArticleInput: GraphQLInputObjectType = new GraphQLInputObjectType({
	name: "ArticleInput",
	fields: {
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		title: { type: new GraphQLNonNull(GraphQLString) },
		slug: { type: GraphQLString },
		visible: { type: GraphQLBoolean },
		description: { type: GraphQLString },
        blocks: { type: GraphQLString },
	}
});
