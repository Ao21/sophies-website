import { BaseModel, BaseQuery } from "./base/base.model";
import { FieldQuery } from "./field/field.model";

import { mergeStrings, mergeResolvers } from "gql-merge";

import { merge } from "lodash";

export class Models {
	base: BaseModel;

	resolver: any;

	schema: any;

	constructor() {
		this.base = new BaseModel();
	}
}
