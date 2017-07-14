import { BaseField, BaseFieldConfig } from './field.model';
import { isPresent } from './../../../core/utils/facade';

export class TextField extends BaseField<string> {
	type = 'text';

	inputType = 'text';

	textValue: any;

	constructor(options: {
		id?: string;
		value?: string;
		type?: string;
		key?: string;
		required?: boolean;
		config?: BaseFieldConfig;
		inputType?: string;
		textValue?: any;
	}) {
		super(options);
		this.inputType = options.type;
		this.config = {
			label: isPresent(options.config.label) ? options.config.label : null,
			placeholder: isPresent(options.config.placeholder) ? options.config.placeholder : '',
			required: isPresent(options.config.required) ? options.config.required : false,
			description: isPresent(options.config.description) ? options.config.description : '',
			validators: isPresent(options.config.validators) ? options.config.validators : [],
		};
		if (isPresent(options.textValue)) {
			this.value = options.textValue;
		}
	}
}
