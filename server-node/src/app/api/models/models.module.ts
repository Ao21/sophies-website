import { BaseModel } from "./base/base.model";
import { FieldModel, Field } from "./field/field.model";

import { mergeStrings, mergeResolvers } from "gql-merge";

import { merge } from "lodash";

export class Models {
	base: BaseModel;
	field: FieldModel;

	resolver: any;

	schema: any;
	constructor() {
		this.base = new BaseModel();
		this.field = new FieldModel();
        this.schema = mergeStrings([this.base.baseQuery, this.field.fieldGQL]);
		this.resolver = merge(this.base.resolver, this.field.resolver);
	}
}
