import FieldGQLFile from "./field.gql";
import { TextField } from "./field.mongodb";
import { buildSchema, Source } from "graphql";

const fakeDB: any = {};

export interface Field {
	key?: string;
	type?: string;
	label?: string;
	required?: boolean;
	validators?: string[];
	placeholder?: string;
}

export class FieldModel {
	fieldGQL = FieldGQLFile;
	resolver: Field = new Field();

	constructor() {}
}


export class Field {

	createField({ input }: { input: Field }, a: any, b: any, c: any) {
		fakeDB.field = input;
		return input;
	}

	field(a: any, b: any, c: any) {
		return fakeDB.field;
	}
}
