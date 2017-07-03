import { BaseField } from './field.model';

export class DateField extends BaseField<boolean> {
	type = 'date';

	constructor(options: {}) {
		super(options);
	}
}