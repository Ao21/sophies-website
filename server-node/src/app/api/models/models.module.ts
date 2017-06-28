import { BaseModel } from "./base/base.model";
import { FieldQuery, Field } from "./field/field.model";

import { mergeStrings, mergeResolvers } from "gql-merge";

import { merge } from "lodash";

export class Models {
	base: BaseModel;

	resolver: any;

	schema: any;
	field: Field;

	constructor() {
		this.base = new BaseModel();
		this.field = new Field();
	}
}
