import { BaseField, BaseFieldConfig } from './field.model';

export class FieldGroup extends BaseField<BaseField<any>[]> {
	type = 'group';
	constructor(options: {
		id?: string;
		value?: BaseField<any>[];
		key?: string;
		required?: boolean;
		type?: string;
		config?: BaseFieldConfig;
		childFields?: any[];
	}) {
		super(options);
		this.childFields = options.childFields;
	}
}
