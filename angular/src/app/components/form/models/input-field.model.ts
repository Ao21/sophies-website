import { BaseField } from './field.model';

export class TextField extends BaseField<string> {
	type = 'text';
	placeholder: string;

	constructor(options: {}) {
		super(options);
	}
}