import { BaseField } from './field.model';
import { isPresent } from './../../../core/utils/facade';

export class TextAreaField extends BaseField<string> {
	type = 'textarea';
	placeholder = '';

	constructor(options: { value?: any; textareaValue?: any }) {
		super(options);
		if (isPresent(options.textareaValue)) {
			this.value = options.textareaValue;
		}
	}
}