export class BaseField<T> {
	id: string;
	value?: T;
	required: boolean;
	type: string;

	constructor(
		options: {
			id?: string;
			value?: T;
			required?: boolean;
			type?: string;
		} = {}
	) {
		this.id = options.id;
		this.value = options.value;
		this.required = options.required;
		this.type = options.type;
	}
}
