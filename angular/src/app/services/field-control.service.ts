import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
	isPresent,
	findPropertyDeep,
	isPrimitive
} from './../core/utils/facade';

import {
	BaseField,
	TextField,
	CheckboxField,
	DateField,
	ToggleField,
	AssetField,
	TextAreaField,
	SelectField,
	MultiField,
	FieldGroup
} from './../components/form/models/';

@Injectable()
export class FieldControlService {
	values: any;
	constructor() {}

	getFields(f: BaseField<any>[], values?: any) {
		const fields = f.slice(0);

		if (!f) {
			return [];
		}

		this.values = values;

		const fieldArr: BaseField<any>[] = [];

		_.forEach(fields, question => {
			const updatedQuestion = this.mapQuestionToValues(question, values);
			const field = this.getFieldType(updatedQuestion);
			fieldArr.push(field);
		});
		this.values = null;
		return fieldArr;
	}

	mapQuestionsToValues(f: BaseField<any>[], values?: any) {
		const fields = f.slice(0);
		console.log(fields);
		const fieldArr: BaseField<any>[] = [];
		_.forEach(fields, question => {
			const updatedQuestion = this.mapQuestionToValues(question, values);
			fieldArr.push(updatedQuestion);
		});
		return fieldArr;
	}

	mapQuestionToValues(q: any, value: any) {

		const prop = findPropertyDeep(value, q.key);
		let question = _.assign({}, q);

		if (question.type === 'group') {
			question = _.assign({}, question, {
				childFields: _.map(question.childFields, child => {
					return this.mapQuestionToValues(child, value);
				})
			});
		}

		if (
			question.type === 'multi' ||
			(question.type === 'asset' && prop.length > 0)
		) {
			return _.assign(question, { value: prop });
		}

		if (prop.length === 1) {
			return _.assign(question, { value: prop[0] });
		} else if (prop.length === 0) {
			return question;
		} else if (isPrimitive(prop)) {
			return _.assign(question, { value: prop });
		} else {
			throw Error('Multiple Properties Matched');
		}
	}

	getFieldValues(f) {
		const fields = [...f];
		const fieldArr: BaseField<any>[] = [];
		_.forEach(fields, question => {
			const updatedQuestion = this.getFieldValue(question);
			fieldArr.push(updatedQuestion);
		});
		return fieldArr;
	}

	getFieldValue(field: any) {
		switch (field.type) {
			case 'text':
			case 'number':
			case 'tel':
				field = _.assign({}, field, {value: field.textValue});
				break;
			case 'textarea':
				field = _.assign({}, field, {value: field.textareaValue});
				break;
			case 'toggle':
				field = _.assign({}, field, {value: field.toggleValue});
				break;
			case 'checkbox':
				field = _.assign({}, field, {value: field.checkboxValue});
				break;
			case 'date':
				field = _.assign({}, field, {value: field.dateValue});
				break;
			case 'asset':
				field = _.assign({}, field, {value: field.assetValue});
				break;
		}
		return field;
	}

	getFieldType(field: BaseField<any>) {
		switch (field.type) {
			case 'text':
			case 'number':
			case 'tel':
				return new TextField(field);
			case 'textarea':
				return new TextAreaField(field);
			case 'toggle':
				return new ToggleField(field);
			case 'checkbox':
				return new CheckboxField(field);
			case 'date':
				return new DateField(field);
			case 'asset':
				return new AssetField(field);
			case 'select':
				return new SelectField(field);
			case 'multi':
				return new MultiField(field);
			case 'group':
				return this.createFieldGroup(field);
			default:
				throw new Error('Not a valid field type');
		}
	}

	createFieldGroup(field) {
		const f = new FieldGroup(field);
		f.childFields = this.getFields(f.childFields, this.values);
		return f;
	}

	toFormGroup(q: BaseField<any>[]) {
		if (!q) {
			throw new Error('No Questions Found to create a form with');
		}
		const group: any = {};
		const subGroup = [];

		const questions = q.map(question => {
			const fieldValue = isPresent(question.value)
				? question.value
				: null;
			if (question.childFields && question.childFields.length > 0) {
				subGroup.push({
					group: this.toFormGroup(question.childFields),
					key: question.key,
					id: question.id
				});
			} else {
				const validators =
					question.config && question.config.required
						? [Validators.required]
						: [];

				if (question.config && question.config.validators) {
					// validators = validators.concat(question.config.validators);
				}

				group[question.key] = new FormControl(
					fieldValue,
					Validators.compose(validators)
				);
				group[question.key].id = question.id;
			}
		});

		const formGroup = new FormGroup(group);
		subGroup.forEach((e: any) => {
			formGroup.addControl(e.key, e.group);
			formGroup.get(e.key)['id'] = e.id;
		});

		return formGroup;
	}
}
