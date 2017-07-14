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

export const CONFIG_FIELDS = [
	<TextField>{
		id: 'label',
		key: 'label',
		type: 'text',
		config: {
			label: 'Field Label',
			placeholder: 'Label',
			required: true
		}
	},
	<ToggleField>{
		id: 'required',
		key: 'required',
		type: 'toggle',
		value: false,
		config: {
			label: 'Required',
			required: false
		}
	},
	<MultiField>{
		id: 'categories',
		key: 'categories',
		type: 'multi',
		config: {
			label: 'Enter a Category',
			required: true,
			placeholder: 'Type a category',
		}
	}
];
export const DEFAULT_FIELD_FIELDS = [
	<TextField>{
		id: 'key',
		key: 'key',
		type: 'text',
		config: {
			label: 'Field Key',
			placeholder: 'Key',
			required: true
		}
	},
	<FieldGroup>{
		id: 'config',
		key: 'config',
		type: 'group',
		config: {
			label: 'Config Key'
		},
		childFields: CONFIG_FIELDS
	}
];


export const ASSET_FIELD_FIELDS = [
	<FieldGroup>{
		id: 'config',
		key: 'config',
		type: 'group',
		config: {
			label: 'Config Key'
		},
		childFields: [
			{
				id: 'max',
				key: 'max',
				type: 'number',
				value: 1,
				config: {
					label: 'Maximum Amount of Assets',
					required: true
				}
			}
		]
	}
];

export const TEXT_FIELD_FIELDS = [
	<FieldGroup>{
		id: 'config',
		key: 'config',
		type: 'group',
		config: {
			label: 'Config Key'
		},
		childFields: [
			{
				id: 'placeholder',
				key: 'placeholder',
				type: 'text',
				config: {
					label: 'Field Placeholder',
					placeholder: 'Placeholder',
					required: true
				}
			}
		]
	}
];

export const CMS_SIDE_FIELDS = [
	<SelectField>{
		id: 'type',
		key: 'type',
		type: 'select',
		config: {
			label: 'Field Type'
		},
		value: 'text',
		options: [
			{
				name: 'Text Field',
				value: 'text'
			},
			{
				name: 'Textarea Field',
				value: 'textarea'
			},
			{
				name: 'Toggle Field',
				value: 'toggle'
			},
			{
				name: 'Checkbox Field',
				value: 'checkbox'
			},
			{
				name: 'Date Field',
				value: 'date'
			},
			{
				name: 'Asset Field',
				value: 'asset'
			}
		]
	}
];
