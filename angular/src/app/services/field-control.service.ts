import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { isPresent } from './../core/utils/facade';

import {
	BaseField,
	TextField,
	CheckboxField,
	DateField,
	ToggleField
} from './../components/form/models/';

@Injectable()
export class FieldControlService {
	constructor() {}

	getFields(fields: BaseField<any>[]) {
		if (!fields) {
			return [];
		}

		const fieldArr: BaseField<any>[] = [];

		fields.forEach(question => {
			const field = this.getFieldType(question);
			fieldArr.push(field);
		});
		return fieldArr;
	}

	getFieldType(field: BaseField<any>) {
		switch (field.type) {
			case 'text':
			case 'textarea':
				return new TextField(field);
			case 'toggle':
				return new ToggleField(field);
			case 'checkbox':
				return new CheckboxField(field);
			case 'date':
				return new DateField(field);
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
			console.log(question);
			const fieldValue = isPresent(question.value)
				? question.value
				: null;
			console.log(question);
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
