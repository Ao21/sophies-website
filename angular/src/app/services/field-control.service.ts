import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { isPresent, findPropertyDeep } from './../core/utils/facade';

import {
	BaseField,
	TextField,
	CheckboxField,
	DateField,
	ToggleField,
	AssetField,
	TextAreaField,
	SelectField,
	FieldGroup
} from './../components/form/models/';

@Injectable()
export class FieldControlService {
	constructor() {}

	getFields(fields: BaseField<any>[], values?: any) {
		if (!fields) {
			return [];
		}

		const fieldArr: BaseField<any>[] = [];

		_.forEach(fields, question => {
			const updatedQuestion = this.mapQuestionToValues(question, values);
			const field = this.getFieldType(updatedQuestion);
			fieldArr.push(field);
		});

		return fieldArr;
	}

	mapQuestionToValues(question: any, value: any) {
		const prop = findPropertyDeep(value, question.id);

		if (question.type === 'group') {
			question = _.assign({}, question, {
				childFields: _.map(question.childFields, child => {
					return this.mapQuestionToValues(child, value);
				})
			});
		}

		if (prop.length === 1) {
			return _.assign(question, { value: prop[0] });
		} else if (prop.length === 0) {
			return question;
		} else {
			throw Error('Multiple Properties Matched');
		}
	}

	getFieldType(field: BaseField<any>) {
		switch (field.type) {
			case 'text':
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
			case 'group':
				return new FieldGroup(field);
			default:
				throw new Error('Not a valid field type');
		}
	}

	toFormGroup(questions: BaseField<any>[]) {
		if (!questions) {
			throw new Error('No Questions Found to create a form with');
		}
		const group: any = {};

		const subGroup = [];

		questions.forEach(question => {
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
