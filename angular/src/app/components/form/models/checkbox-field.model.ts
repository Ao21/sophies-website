import { BaseField } from './field.model';
import { isPresent } from './../../../core/utils/facade';

export class CheckboxField extends BaseField<boolean> {
	type = 'checkbox';

	constructor(options: { value?: any; checkboxValue?: any }) {
		super(options);
		if (isPresent(options.checkboxValue)) {
			this.value = options.checkboxValue;
		}
	}
}
