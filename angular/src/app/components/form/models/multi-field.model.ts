
import { BaseField, BaseFieldConfig } from './field.model';
import { isPresent } from './../../../core/utils/facade';

export class MultiField extends BaseField<string[]> {
	type = 'multi';

	constructor(options: {
		id?: string;
		value?: string[];
		key?: string;
		required?: boolean;
		type?: string;
		config?: BaseFieldConfig;
	}) {
		super(options);
		this.value = isPresent(options.value) ? options.value : [];
	}
}