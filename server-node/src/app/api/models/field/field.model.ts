import FieldGQLFile from './field.gql';
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
    fieldGQL = FieldGQLFile;
    fieldResolve: Field = new Field();

    constructor() {}
}

export class Field implements Field {
    field() {
        return {id: 5, type: 'blah'}
    }
}
