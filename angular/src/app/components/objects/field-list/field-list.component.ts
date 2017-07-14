import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { BaseField } from './../../form/models/field.model';
import {
	GetAllFieldsQuery,
	DefaultFieldFragment
} from './../../../queries/fields.query';

import * as _ from 'lodash';

@Component({
	selector: 'field-list',
	templateUrl: './field-list.component.html',
	styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit {
	@Input() selectedFields: any;
	@Output() select: EventEmitter<BaseField<any>> = new EventEmitter();
	entries$: ApolloQueryObservable<any>;

	constructor(private apollo: Apollo) {}

	checkIfUsed(entry) {
		if (_.find(this.selectedFields, (field: BaseField<any>) => field.id === entry.id)) {
			return true;
		}
		return false;
	}

	ngOnInit() {
		console.log(this.selectedFields);
		this.entries$ = this.apollo.watchQuery({
			query: GetAllFieldsQuery
		});

	}

	selectField(field) {
		this.select.next(field);
	}
}
