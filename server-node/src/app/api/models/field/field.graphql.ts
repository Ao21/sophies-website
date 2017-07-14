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
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';


import { Value } from './../base/base.graphql';

import { Asset } from '../assets/assets.graphql';

export const FieldConfigInterface: GraphQLInterfaceType = new GraphQLInterfaceType(
	{
		name: 'FieldConfigInterface',
		fields: {
			label: { type: GraphQLString },
			placeholder: { type: GraphQLString },
			required: { type: GraphQLBoolean },
			validators: { type: new GraphQLList(GraphQLString) },
			categories: { type: new GraphQLList(GraphQLString) },
			max: { type: GraphQLInt }
		},
		resolveType() {
			return FieldConfigObject;
		}
	}
);

export const FieldConfigObject = new GraphQLObjectType({
	name: 'FieldConfig',
	fields: {
		label: { type: GraphQLString },
		placeholder: { type: GraphQLString },
		required: { type: GraphQLBoolean },
		validators: { type: new GraphQLList(GraphQLString) },
		categories: { type: new GraphQLList(GraphQLString) },
		max: { type: GraphQLInt }
	},
	interfaces: [FieldConfigInterface]
});

export const FieldInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
	name: 'FieldInterface',
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigInterface }
	},
	resolveType(value) {
		if (value.type === 'text') {
			return TextField;
		}
		if (value.type === 'date') {
			return DateField;
		}
		if (value.type === "group") {
			return FieldGroup;
		}
		if (value.type === "asset") {
			return AssetField;
		}
		if (value.type === "textarea") {
			return TextAreaField;
		}
		if (value.type === "checkbox") {
			return CheckboxField;
		}
		if (value.type === "toggle") {
			return ToggleField;
		}
	}
});

export const FieldInput: GraphQLInputObjectType = new GraphQLInputObjectType({
	name: "FieldInput",
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) }
	}
});

export const FieldConfigInput: GraphQLInputObjectType = new GraphQLInputObjectType(
	{
		name: "FieldConfigInput",
		fields: {
			label: { type: GraphQLString },
			placeholder: { type: GraphQLString },
			required: { type: GraphQLBoolean },
			validators: { type: new GraphQLList(GraphQLString) },
			categories: { type: new GraphQLList(GraphQLString) },
			max: { type: GraphQLInt }
		}
	}
);

export const FieldUpdateSettings: GraphQLInputObjectType = new GraphQLInputObjectType(
	{
		name: "FieldUpdateSettings",
		fields: {
			previousField: { type: GraphQLString }
		}
	}
);

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

export const TextAreaField: GraphQLObjectType = new GraphQLObjectType({
	name: "TextAreaField",
	interfaces: [FieldInterface],
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigObject },
		value: { type: GraphQLString }
	},
	isTypeOf: value => value.type === "textarea"
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

export const ToggleField: GraphQLObjectType = new GraphQLObjectType({
	name: "ToggleField",
	interfaces: [FieldInterface],
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigObject },
		value: { type: GraphQLBoolean }
	},
	isTypeOf: value => value.type === "toggle"
});

export const CheckboxField: GraphQLObjectType = new GraphQLObjectType({
	name: "CheckboxField",
	interfaces: [FieldInterface],
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigObject },
		value: { type: GraphQLBoolean }
	},
	isTypeOf: value => value.type === "checkbox"
});

export const AssetField: GraphQLObjectType = new GraphQLObjectType({
	name: "AssetField",
	interfaces: [FieldInterface],
	fields: {
		id: { type: GraphQLID },
		type: { type: new GraphQLNonNull(GraphQLString) },
		key: { type: new GraphQLNonNull(GraphQLString) },
		config: { type: FieldConfigObject },
		value: { type: new GraphQLList(Asset) }
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
	types: [
		TextField,
		DateField,
		FieldGroup,
		AssetField,
		TextAreaField,
		ToggleField,
		CheckboxField
	],
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
		if (value.type === "textarea") {
			return TextAreaField;
		}
		if (value.type === "checkbox") {
			return CheckboxField;
		}
		if (value.type === "toggle") {
			return ToggleField;
		}
	}
});
