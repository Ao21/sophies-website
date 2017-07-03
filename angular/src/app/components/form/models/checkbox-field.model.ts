import { BaseField } from './field.model';

export class CheckboxField extends BaseField<boolean> {
	type = 'checkbox';

	constructor(options: {}) {
		super(options);
	}
}