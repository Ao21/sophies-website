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

export const DEFAULT_ENTRY_FIELDS = [
	<TextField>{
		id: 'title',
		key: 'title',
		type: 'text',
		config: {
			label: 'Title',
			placeholder: 'Enter an article title',
			required: true
		}
	}
];

export const DEFAULT_ENTRY_SIDE_FIELDS = [
	<ToggleField>{
		id: 'visible',
		key: 'visible',
		type: 'toggle',
		config: {
			label: 'Visible',
			required: true
		}
	},
	<TextField>{
		id: 'slug',
		key: 'slug',
		type: 'text',
		config: {
            label: 'Slug',
			required: true
		}
	}
];
