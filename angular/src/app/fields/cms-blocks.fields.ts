import {
	SelectField,
	TextAreaField,
	TextField,
	ToggleField,
	DateField,
	AssetField,
	CheckboxField,
	MultiField,
	FieldGroup
} from './../components/form/models/';

export const DEFAULT_BLOCK_FIELDS = [
	<TextField>{
		id: 'name',
		key: 'name',
		type: 'text',
		config: {
			label: 'Block Name',
			placeholder: 'Type a name',
			required: true
		}
	},
	<TextField>{
		id: 'tag',
		key: 'tag',
		type: 'text',
		config: {
			label: 'Tag Name',
			placeholder: 'Type a name',
			required: true
		}
	},
	<TextField>{
		id: 'img',
		key: 'img',
		type: 'asset',
		config: {
			label: 'Image Name',
			placeholder: 'Type a name',
			required: true
		}
	},
	<ToggleField>{
		id: 'singleOnly',
		key: 'singleOnly',
		type: 'toggle',
		config: {
			label: 'Single Only',
			required: true
		}
	}
];