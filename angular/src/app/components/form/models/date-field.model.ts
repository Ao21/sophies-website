import { BaseField } from './field.model';
import { isPresent } from './../../../core/utils/facade';

export class DateField extends BaseField<boolean> {
	type = 'date';

	constructor(options: { value?: any, dateValue?: any }) {
		super(options);
		if (isPresent(options.dateValue)) {
			this.value = options.dateValue;
		}
	}
}
