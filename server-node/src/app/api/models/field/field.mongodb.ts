import * as mongoose from "mongoose";
import { RepositoryBase } from "./../../../common/mongo/generic-repository";
import { FieldModel } from "./field.model";

export const BaseFieldSchema = new mongoose.Schema({
	key: String,
	type: String,

	config: {
		label: String,
		placeholder: String,
		required: Boolean,
		validators: [String]
	},
	value: mongoose.Schema.Types.Mixed
});

export const TextFieldSchema = new mongoose.Schema({
	type: { type: String, default: "text" },
	value: { type: String }
});

export const DateFieldSchema = new mongoose.Schema({
	type: { type: String, default: "date" },
	value: { id: String, description: String }
});

export const RadioFieldSchema = new mongoose.Schema({
	type: { type: String, default: "radio" },
	options: [{ id: String, description: String }],
	value: { id: String, description: String }
});

export const FieldGroupSchema = new mongoose.Schema({
	type: { type: String, default: "group" },
	childFields: [{ type: mongoose.Schema.Types.ObjectId, ref: "Field" }]
});

export const AssetFieldSchema = new mongoose.Schema({
	type: { type: String, default: "asset" },
	urls: [String]
});

BaseFieldSchema.virtual("id").get(() => this.id);
BaseFieldSchema.set("toObject", { virtuals: true });
BaseFieldSchema.set("toJSON", { virtuals: true });

export const Field = mongoose.model("Field", BaseFieldSchema, "Fields", true);

export const TextField = Field.discriminator("TextField", TextFieldSchema);
export const DateField = Field.discriminator("DateField", DateFieldSchema);
export const RadioField = Field.discriminator("RadioField", RadioFieldSchema);
export const AssetField = Field.discriminator("AssetField", AssetFieldSchema);
export const FieldGroup = Field.discriminator("FieldGroup", FieldGroupSchema);

export class GenericFieldRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(Field);
	}
}

export class TextfieldFieldRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(TextField);
	}
}

export class FieldGroupRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(FieldGroup);
	}
}

export class DateFieldRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(DateField);
	}
}

export class AssetFieldRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(AssetField);
	}
}

export function getRepoType(type: string) {
	switch (type) {
		case "date":
			return new DateFieldRepository();
		case "text":
			return new TextfieldFieldRepository();
		case "group":
            return new FieldGroupRepository();
        case "asset":
			return new AssetFieldRepository();
		default:
			return new GenericFieldRepository();
	}
}
