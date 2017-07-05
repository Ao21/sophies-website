import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from './../../../services/field-control.service';

import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';

import {
	CreateFieldMutation,
	UpdateFieldMutation,
	GetAllFieldsQuery
} from './../../../queries/fields.query';

import { mergeArrayByProp } from './../../../core/utils/facade';

import * as _ from 'lodash';

import {
	CMS_SIDE_FIELDS,
	DEFAULT_FIELD_FIELDS,
	TEXT_FIELD_FIELDS
} from './../../../fields/cms-fields.fields';

interface SideFieldInterface {
	type: string;
}

@Component({
	selector: 'cms-field',
	templateUrl: './cms-field.component.html',
	styleUrls: ['./cms-field.component.scss']
})
export class CmsFieldComponent implements OnInit {
	mainForm: any = null;
	sideForm: any;

	sideFieldValue: any;

	form: any;

	data: any = {};

	constructor(
		private apollo: Apollo,
		private router: Router,
		private changeRef: ChangeDetectorRef,
		private route: ActivatedRoute,
		private fieldControlService: FieldControlService
	) {}

	ngOnInit() {
		this.route.data.subscribe(next => {
			this.data = next;
			this.sideForm = this.fieldControlService.getFields(
				CMS_SIDE_FIELDS,
				next
			);
		});
	}

	sideBarUpdate(sideField: SideFieldInterface) {
		this.sideFieldValue = sideField;
		this.mainForm = this.mergeFields(sideField.type);
	}

	fieldUpdates(fieldValueUpdate) {
		this.form = _.assign({}, this.sideFieldValue, fieldValueUpdate);
	}

	createField() {
		let query = CreateFieldMutation;
		let variables = _.assign({}, this.form, this.form.config, {
			config: undefined
		});

		if (this.data.field) {
			query = UpdateFieldMutation;
			variables = _.assign({}, variables, {
				id: this.data.field.id
			});
		}
		this.apollo.mutate({
			mutation: query,
			variables: variables,
			refetchQueries: [
				{
					query: GetAllFieldsQuery
				}
			]
		});

		this.router.navigate(['./..'], { relativeTo: this.route });
	}

	mergeFields(type: string) {
		let fieldsToMerge;
		switch (type) {
			case 'text':
				fieldsToMerge = _.merge([
					...DEFAULT_FIELD_FIELDS,
					...TEXT_FIELD_FIELDS
				]);
				break;
			case 'textarea':
			case 'date':
				fieldsToMerge = [...DEFAULT_FIELD_FIELDS];
				break;
		}

		return this.fieldControlService.getFields(
			mergeArrayByProp(fieldsToMerge, 'id'),
			this.data
		);
	}
}
