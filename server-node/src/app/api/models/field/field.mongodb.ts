import * as mongoose from 'mongoose';

export const BaseFieldSchema = new mongoose.Schema({
    key: String,
    type: String,
    label: String,
    required: Boolean,
    order: Number,
    helpId: Number,
    validators: [String],
    placeholder: String,
    value: String,
    childFields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Field' }]
})

export const TextFieldSchema = new mongoose.Schema({
    type: { type: String, default: 'text' },
    value: { type: String }
})

export const DateFieldSchema = new mongoose.Schema({
    type: { type: String, default: 'dropdown' },
    options: [{ id: String, description: String }],
    value: { id: String, description: String },
})

export const RadioFieldSchema = new mongoose.Schema({
    type: { type: String, default: 'radio' },
    options: [{ id: String, description: String }],
    value: { id: String, description: String },
})

export const FieldSchema = mongoose.model('Field', BaseFieldSchema);
export const TextField = FieldSchema.discriminator('TextField', TextFieldSchema);
export const DateField = FieldSchema.discriminator('DateField', DateFieldSchema);
export const RadioField = FieldSchema.discriminator('RadioField', RadioFieldSchema);
