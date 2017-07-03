import { BaseField } from './field.model';

export class ToggleField extends BaseField<boolean> {
	type = 'toggle';
	value: boolean;

	constructor(options: {
		value?: boolean;
	} = {}) {
		super(options);
		this.value = options.value ? options.value : false;
	}
}