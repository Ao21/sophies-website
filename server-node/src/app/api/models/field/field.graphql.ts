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

export const FieldConfigInterface: GraphQLInterfaceType = new GraphQLInterfaceType(
    {
		name: "FieldConfigInterface",

        fields: {
            label: { type: GraphQLString },
            placeholder: { type: GraphQLString },
            required: { type: GraphQLBoolean },
            validators: { type: new GraphQLList(GraphQLString) }
        }
    }
);
export const FieldInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: "FieldInterface",
    fields: {
        id: { type: GraphQLID },
        type: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigInterface },
	},
	resolveType(value) {
        if (value.type === "text") {
            return TextField;
        }
        if (value.type === "date") {
            return DateField;
		}
		 if (value.type === "group") {
            return FieldGroup;
        }
    }
});

export const TextField: GraphQLObjectType = new GraphQLObjectType({
    name: "TextField",
    interfaces: [FieldInterface],
    fields: {
        id: { type: GraphQLID },
        type: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) },
        config: { type: FieldConfigInterface },
        value: { type: GraphQLString }
    },
    isTypeOf: value => value.type === "text"
});

export const DateField: GraphQLObjectType = new GraphQLObjectType({
    name: "DateField",
    interfaces: [FieldInterface],
    fields: {
        id: { type: GraphQLID },
        type: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) },
        config: { type: FieldConfigInterface },
        value: { type: GraphQLString }
    },
    isTypeOf: value => value.type === "date"
});

export const FieldGroup: GraphQLObjectType = new GraphQLObjectType({
    name: "FieldGroup",
	interfaces: [FieldInterface],
    fields: {
        id: { type: GraphQLID },
        type: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigInterface },
		childFields: {type: new GraphQLList(FieldInterface) }
    }
});

export const Field: GraphQLUnionType = new GraphQLUnionType({
    name: "Field",
    types: [TextField, DateField, FieldGroup],
    resolveType(value) {
        if (value.type === "text") {
            return TextField;
        }
        if (value.type === "date") {
            return DateField;
		}
		if (value.type === "group") {
            return FieldGroup;
        }
    }
});


const InputField: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: "FieldInput",
    fields: {
        type: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const MutationCreateField: GraphQLFieldConfig<any, any> = {
	type: Field,
    args: {
        input: { type: InputField }
    },
	resolve: (root: any, { title }: { title: any }) => {
        return { type: "text", id: "3", key: "text" };
    }
};


export const query = new GraphQLObjectType({
    name: "Query",
    fields: {
        field: {
            type: new GraphQLList(Field),
            args: {
                where: { type: GraphQLID },
                id: { type: GraphQLID }
            },
			resolve: function (_, { id }) {
				return [
					{ type: "group", id: "3", key: "date", childFields: [{ type: "date", id: "3", key: "date" }] },
                    { type: "date", id: "3", key: "date" },
                    { type: "text", id: "3", key: "text" }
                ];
            }
        }
    }
});

export const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createField: MutationCreateField
    }
});
