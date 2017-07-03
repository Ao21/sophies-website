import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from './../../../services/field-control.service';

import { BaseField } from './../models/';

import { Subscription } from 'rxjs/Rx';

@Component({
	selector: 'dynamic-form',
	templateUrl: './dynamic-form.component.html',
	providers: [FieldControlService],
	styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
	@Input() form: FormGroup;
	subscriptions: Subscription[] = [];
	questions: BaseField<any>[] = [
		{
			id: 'field',
			type: 'text',
			key: 'key',
			config: {
				label: 'Title',
				placeholder: 'Title of the article',
			}
		},
		{
			id: 'toggleField',
			type: 'toggle',
			key: 'toggleFieldKey',
			config: {
				label: 'Featured',
				description: 'Should this article featured on the main page?'
			}
		},
		{
			id: 'textAreaField',
			type: 'textarea',
			key: 'textAreaField',
			config: {
				label: 'Featured',
				description: 'Should this article featured on the main page?'
			}
		},
		{
			id: 'checkboxField',
			type: 'checkbox',
			key: 'checkBoxField',
			config: {
				label: 'Featured',
				description: 'Should this article featured on the main page?'
			}
		},
		{
			id: 'dateField',
			type: 'date',
			key: 'dateField',
			config: {
				label: 'Featured',
				description: 'Should this article featured on the main page?'
			}
		}
	];

	constructor(private fieldControlService: FieldControlService) {}

	ngOnInit() {
		this.form = this.fieldControlService.toFormGroup(this.fieldControlService.getFields(this.questions));
	}

	ngAfterViewInit() {
		this.initSubs();
	}

	initSubs() {
		const fieldValueChangeSub = this.form.valueChanges.subscribe((next) => {
			console.log(next);
		});
	}
	getFormControl(key: string) {
		return this.form.get(key);
	}
}
