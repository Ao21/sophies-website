import * as mongoose from "mongoose";

export const BaseFieldSchema = new mongoose.Schema({
	key: String,
	type: String,

	config: {
		label: String,
		placeholder: String,
		required: Boolean,
		validators: [String],
	},
	value: mongoose.Schema.Types.Mixed,
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
	childFields: [{ type: mongoose.Schema.Types.ObjectId, ref: "Field" }],
});


export const FieldSchema = mongoose.model("Field", BaseFieldSchema);

export const TextField = FieldSchema.discriminator(
	"TextField",
	TextFieldSchema
);
export const DateField = FieldSchema.discriminator(
	"DateField",
	DateFieldSchema
);
export const RadioField = FieldSchema.discriminator(
	"RadioField",
	RadioFieldSchema
);

export const FieldGroup = FieldSchema.discriminator(
	"FieldGroup",
	FieldGroupSchema
);
