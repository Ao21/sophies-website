import { BaseField, BaseFieldConfig } from './field.model';
import { isPresent } from './../../../core/utils/facade';

export class SelectField extends BaseField<string> {
	type = 'select';

	options: { name: string; value: any }[];

	constructor(options: {
		id?: string;
		value?: string;
		key?: string;
		required?: boolean;
		type?: string;
		config?: BaseFieldConfig;
		options?: {
			name: string;
			value: string;
		}[];
	}) {
		super(options);
		this.options = isPresent(options.options) ? options.options : null;
	}
}
