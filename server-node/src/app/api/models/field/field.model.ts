import FieldGraph from './field.gql';
import { buildSchema, Source } from 'graphql';


export interface Field {
    key?: string;
    type?: string;
    label?: string;
    required?: boolean;
    validators?: string[];
    placeholder?: string;
}

export class FieldModel {
    fieldGQL = FieldGraph;

    constructor() {}
}

export class Field implements Field {
    constructor({key, type, label, required, validators, placeholder}: Field) {
        this.key = key;
        this.type = type;
        this.label = label;
        this.required = required;
        this.validators = validators;
        this.placeholder = placeholder;
    }
}
