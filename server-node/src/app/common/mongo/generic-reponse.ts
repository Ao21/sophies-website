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


export const MongooseResponse: GraphQLInputObjectType = new GraphQLInputObjectType({
	name: "MongooseResponse",
	fields: {
		id: { type: new GraphQLNonNull(GraphQLString) },
	}
});

