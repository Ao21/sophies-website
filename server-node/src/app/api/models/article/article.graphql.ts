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
        name: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        dateCreated: { type: new GraphQLNonNull(GraphQLString) },
        dateUpdated: { type: new GraphQLNonNull(GraphQLString) },
        blocks: { type: new GraphQLList(Block) }
    },
    resolveType(value) {
        return Article;
    }
});

export const Article: GraphQLObjectType = new GraphQLObjectType({
    name: "Article",
    interfaces: [ArticleInterface],
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        dateCreated: { type: new GraphQLNonNull(GraphQLString) },
        dateUpdated: { type: new GraphQLNonNull(GraphQLString) },
        blocks: { type: new GraphQLList(Block) }
    }
});

export const ArticleInput: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: "ArticleInput",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        dateCreated: { type: new GraphQLNonNull(GraphQLString) },
        dateUpdated: { type: new GraphQLNonNull(GraphQLString) },
        blocks: { type: new GraphQLList(BlockInput) }
    }
});
