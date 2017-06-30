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
import * as _ from "lodash";

import { FieldQuery, FieldMutation } from "./../field/field.model";
import { BlockQuery, BlockMutation } from "./../block/block.model";
import { ArticleQuery, ArticleMutation } from "./../article/article.model";

export class BaseModel {}

export const BaseQuery = new GraphQLObjectType({
    name: "Query",
    fields: _.assign({}, FieldQuery, BlockQuery, ArticleQuery)
});

export const BaseMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: _.assign({}, FieldMutation, BlockMutation, ArticleMutation)
});
