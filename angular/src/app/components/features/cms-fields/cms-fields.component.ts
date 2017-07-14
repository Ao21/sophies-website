import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import {
	GetAllFieldsQuery,
	DefaultFieldFragment,
	RemoveFieldMutation
} from './../../../queries/fields.query';

enum FieldItemEvents {
	DELETE = 0,
	EDIT = 1
}

@Component({
	selector: 'cms-fields',
	templateUrl: './cms-fields.component.html',
	styleUrls: ['./cms-fields.component.scss']
})
export class CmsFieldsComponent implements OnInit {
	entries$: ApolloQueryObservable<any>;

	assetListConfig = {
		selectable: false
	};

	fieldsConfig = [
		{
			field: '',
			header: '',
			type: 'checkbox'
		},
		{
			field: 'label',
			header: 'Label',
			type: 'fluid'
		},
		{
			field: 'type',
			header: 'Type',
			type: 'text'
		},
		{
			header: '',
			type: 'settings',
			options: [
				{
					name: 'Edit',
					trigger: 'EDIT'
				},
				{
					name: 'Delete',
					trigger: 'DELETE'
				},
			]
		}
	];

	constructor(
		private apollo: Apollo,
		private router: Router,
		private route: ActivatedRoute
	) {}

	triggerFieldEvent($event) {
		if ($event.trigger === 'DELETE') {
			this.apollo.mutate({
				mutation: RemoveFieldMutation,
				variables: $event,
				refetchQueries: [
					{
						query: GetAllFieldsQuery
					}
				]
			});
		}
		if ($event.trigger === 'EDIT') {
			this.router.navigate([$event.id], { relativeTo: this.route });
		}
	}

	ngOnInit() {
		this.entries$ = this.apollo.watchQuery({
			query: GetAllFieldsQuery
		});
	}

}
