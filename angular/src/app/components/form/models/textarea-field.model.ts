import { BaseField } from './field.model';

export class TextAreaField extends BaseField<string> {
	type = 'textarea';
	placeholder: string;

	constructor(options: {}) {
		super(options);
	}
}