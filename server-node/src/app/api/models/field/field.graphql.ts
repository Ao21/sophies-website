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
		},
		resolveType() {
			return FieldConfigObject
		}
	}
);

export const FieldConfigObject = new GraphQLObjectType({
	name: "FieldConfig",
	fields: {
		label: { type: GraphQLString },
		placeholder: { type: GraphQLString },
		required: { type: GraphQLBoolean },
		validators: { type: new GraphQLList(GraphQLString) }
	},
	interfaces: [FieldConfigInterface]
});
export const FieldInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: "FieldInterface",
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigInterface }
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
		if (value.type === "asset") {
			return AssetField;
		}
	}
});

export const FieldInput: GraphQLInputObjectType = new GraphQLInputObjectType({
	name: "FieldInput",
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
	}
});

export const FieldConfigInput: GraphQLInputObjectType = new GraphQLInputObjectType({
	name: "FieldConfigInput",
	fields: {
		label: { type: GraphQLString },
		placeholder: { type: GraphQLString },
		required: { type: GraphQLBoolean },
		validators: { type: new GraphQLList(GraphQLString) }
	}
});

export const TextField: GraphQLObjectType = new GraphQLObjectType({
	name: "TextField",
	interfaces: [FieldInterface],
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigObject },
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
		config: { type: FieldConfigObject },
		value: { type: GraphQLString }
	},
	isTypeOf: value => value.type === "date"
});

export const AssetField: GraphQLObjectType = new GraphQLObjectType({
	name: "AssetField",
	interfaces: [FieldInterface],
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigObject },
		urls: { type: new GraphQLList(GraphQLString) }
	},
	isTypeOf: value => value.type === "asset"
});

export const FieldGroup: GraphQLObjectType = new GraphQLObjectType({
	name: "FieldGroup",
	interfaces: [FieldInterface],
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigObject },
		childFields: { type: new GraphQLList(FieldInterface) }
	}
});

export const Field: GraphQLUnionType = new GraphQLUnionType({
	name: "Field",
	types: [TextField, DateField, FieldGroup, AssetField],
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
		if (value.type === "asset") {
			return AssetField;
		}
	}
});
