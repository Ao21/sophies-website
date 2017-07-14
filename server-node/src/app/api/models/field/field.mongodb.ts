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
		validators: [String],
		categories: [String],
		min: Number,
		max: Number
	},
	value: mongoose.Schema.Types.Mixed
});

export const TextFieldSchema = new mongoose.Schema({
	type: { type: String, default: "text" },
	value: { type: String }
});

export const TextAreaFieldSchema = new mongoose.Schema({
	type: { type: String, default: "textarea" },
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

export const ToggleFieldSchema = new mongoose.Schema({
	type: { type: String, default: "toggle" },
	value: Boolean
});

export const CheckboxFieldSchema = new mongoose.Schema({
	type: { type: String, default: "checkbox" },
	value: Boolean
});

export const AssetFieldSchema = new mongoose.Schema({
	type: { type: String, default: "asset" },
	assets: [
		{
			path: String,
			originalname: String,
			mimetype: String,
			filename: String
		}
	]
});

BaseFieldSchema.virtual("id").get(() => this.id);
BaseFieldSchema.set("toObject", { virtuals: true });
BaseFieldSchema.set("toJSON", { virtuals: true });

export const Field = mongoose.model("Field", BaseFieldSchema, "Fields", true);

export const TextField = Field.discriminator("TextField", TextFieldSchema);
export const TextAreaField = Field.discriminator("TextAreaField", TextAreaFieldSchema);
export const DateField = Field.discriminator("DateField", DateFieldSchema);
export const RadioField = Field.discriminator("RadioField", RadioFieldSchema);
export const AssetField = Field.discriminator("AssetField", AssetFieldSchema);
export const ToggleField = Field.discriminator("ToggleField", ToggleFieldSchema);
export const CheckboxField = Field.discriminator("CheckboxField", CheckboxFieldSchema);
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

export class TextAreaFieldRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(TextAreaField);
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

export class ToggleFieldRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(ToggleField);
	}
}

export class CheckboxFieldRepository extends RepositoryBase<FieldModel> {
	constructor() {
		super(CheckboxField);
	}
}

export function getRepoType(type: string) {
	switch (type) {
		case "date":
			return new DateFieldRepository();
		case "text":
			return new TextfieldFieldRepository();
		case "textarea":
			return new TextAreaFieldRepository();
		case "group":
			return new FieldGroupRepository();
		case "asset":
			return new AssetFieldRepository();
		case "checkbox":
			return new CheckboxFieldRepository();
		case "toggle":
			return new ToggleFieldRepository();
		default:
			return new GenericFieldRepository();
	}
}
