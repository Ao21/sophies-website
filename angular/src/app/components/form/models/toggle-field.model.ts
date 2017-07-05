import { BaseField, BaseFieldConfig } from './field.model';

export class ToggleField extends BaseField<boolean> {
	type = 'toggle';
	value = false;

	constructor(options: {
		id?: string;
		key?: string;
		required?: boolean;
		config?: BaseFieldConfig;
		value?: boolean;
	} = {}) {
		super(options);
		this.value = options.value ? options.value : false;
	}
}