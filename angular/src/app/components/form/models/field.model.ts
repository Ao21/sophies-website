export class BaseField<T> {
	key: string;
	id: string;
	type: string;
	config?: {
		label?: string;
		placeholder?: string;
		required?: boolean;
		validators?: [string];
		description?: string;
	};
	value?: any;
	options?: [any];
	childFields?: [any];

	constructor(
		options: {
			id?: string;
			value?: T;
			key?: string;
			required?: boolean;
			type?: string;
		} = {}
	) {
		this.id = options.id;
		this.value = options.value;
		this.key = options.key;
		this.type = options.type;
	}
}
