export interface BaseFieldConfig {
	label?: string;
	placeholder?: string;
	required?: boolean;
	validators?: string[];
	description?: string;
}

export class BaseField<T> {
	key: string;
	id: string;
	type: string;
	config?: BaseFieldConfig;
	value?: any;
	options?: any[];
	childFields?: any[];

	constructor(
		options: {
			id?: string;
			value?: T;
			key?: string;
			required?: boolean;
			type?: string;
			config?: BaseFieldConfig;
		} = {}
	) {
		this.id = options.id;
		this.value = options.value;
		this.key = options.key;
		this.type = options.type;
		this.config = options.config;
	}
}
